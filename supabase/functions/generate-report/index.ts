import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================
// Dimension config — single source of truth for keys, labels,
// and max raw score per dimension (from the 45-question form).
// ============================================================
const DIMENSIONS = [
  { key: "leadership_strategy",  raw: "d1_leadership",  label: "Leadership & Strategy",          max: 24 },
  { key: "data_systems",         raw: "d2_data",         label: "Data & Systems",                 max: 24 },
  { key: "ai_literacy_staff",    raw: "d3_literacy",      label: "AI Literacy & Staff Readiness",  max: 24 },
  { key: "governance_policy",    raw: "d4_governance",    label: "Governance & Policy",            max: 24 },
  { key: "current_ai_usage",     raw: "d5_usage",         label: "Current AI Usage",               max: 24 },
  { key: "department_readiness", raw: "d6_departments",   label: "Department Readiness",           max: 24 },
  { key: "security_privacy",     raw: "d7_security",      label: "Security & Privacy",             max: 24 },
  { key: "budget_resources",     raw: "d8_budget",         label: "Budget & Resources",             max: 12 },
];

const STAGE_NAMES = ["", "Digital Foundation", "Experimentation and Literacy", "Integration", "Optimisation", "Transformation"];

// FIXED RULE — normalise every dimension onto the same 1-5 scale so the
// radar chart and scorecard compare like with like, regardless of each
// dimension's raw maximum (24 vs 12 points in the source form).
function normaliseScore(raw: number, max: number): number {
  const scaled = (raw / max) * 5;
  return Math.round(scaled * 2) / 2; // nearest 0.5
}

// FIXED RULE — lowest normalised score is the priority. Ties are ALL
// flagged together, no arbitrary tiebreak. This is code, not an AI opinion,
// so the same scores always produce the same result.
function calculatePriorityDimensions(scores: Record<string, number>): string[] {
  const entries = DIMENSIONS.map((d) => ({ key: d.key, score: scores[d.key] }));
  const minScore = Math.min(...entries.map((e) => e.score));
  return entries.filter((e) => e.score === minScore).map((e) => e.key);
}

// FIXED RULE — flag any dimension scoring 2 or below (out of 5).
function calculateDiscussFlags(scores: Record<string, number>): Record<string, boolean> {
  const flags: Record<string, boolean> = {};
  DIMENSIONS.forEach((d) => { flags[d.key] = scores[d.key] <= 2; });
  return flags;
}

function stripCodeFences(text: string): string {
  return text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
}

function safeParseJson(text: string): any {
  const cleaned = stripCodeFences(text);
  try {
    return JSON.parse(cleaned);
  } catch {
    // Fallback: extract the outermost { ... } block in case the model
    // added any stray text before/after the JSON despite instructions.
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("Could not parse AI response as JSON");
  }
}

export default {
  fetch: async (req: Request) => {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }
    try {
      const data = await req.json();
      const ANTHROPIC_KEY = Deno.env.get("ANTHROPIC_API_KEY");
      if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY not set");

      // ---- Fixed-rule math, computed in code, not by the AI ----
      const scores: Record<string, number> = {};
      DIMENSIONS.forEach((d) => { scores[d.key] = normaliseScore(data[d.raw] ?? 0, d.max); });

      const priorityKeys = calculatePriorityDimensions(scores);
      const discussFlags = calculateDiscussFlags(scores);
      const priorityLabels = priorityKeys.map((k) => DIMENSIONS.find((d) => d.key === k)!.label);
      const stage = data.maturity_stage;
      const readinessStage = STAGE_NAMES[stage] || "Foundation";

      const dimSummary = DIMENSIONS.map((d) =>
        d.label + ": " + scores[d.key] + "/5" + (discussFlags[d.key] ? " (flagged low)" : "")
      ).join("\n");

      // ---- Claude's job: ONLY the qualitative writing. No scoring, no
      // priority selection, no flagging. Strict JSON output, nothing else. ----
      const prompt =
        "You are an AI integration consultant. Based on the assessment below, return ONLY valid JSON, " +
        "no markdown, no code fences, no commentary before or after.\n\n" +
        "CLIENT: " + data.name + ", " + data.role + " at " + data.organisation +
        " (" + data.org_type + ", " + data.org_size + "), " + data.location + ".\n" +
        "Prompted by: " + data.prompt_reason + "\n\n" +
        "NORMALISED SCORES (already calculated, 1-5 scale, do not recalculate or contradict these):\n" +
        dimSummary + "\n" +
        "Readiness stage (already determined): " + readinessStage + "\n" +
        "Priority dimension(s) (already determined, lowest score, do not pick a different one): " + priorityLabels.join(", ") + "\n\n" +
        "Return this exact JSON shape:\n" +
        "{\n" +
        '  "narrative_report": "a warm, professional 1200-1500 word prose report exactly as before: ' +
              'Executive Summary, Your AI Maturity Stage, Dimension-by-Dimension Analysis, Top Priority Gaps, ' +
              'Recommended 90-Day Action Plan, What Good Looks Like, Consultant Note",\n' +
        '  "key_findings": ["exactly 2-3 short plain-language findings, no jargon, a pastor or director could read these aloud"],\n' +
        '  "recommendations": {\n' +
        '    "current_roadmap_step": "which step of the AI Integration Roadmap checklist they are likely at, in plain words",\n' +
        '    "priority_rationale": "1-2 sentences on why the flagged dimension(s) matter most right now, referencing the actual score(s)",\n' +
        '    "recommended_first_pilot": "one specific, low-risk first pilot suited to this organisation",\n' +
        '    "pilot_rationale": "1 sentence on why this pilot specifically, given their scores",\n' +
        '    "sequence": ["3-5 short, concrete next actions in order"],\n' +
        '    "timeframe": "a realistic timeframe for the first pilot and review"\n' +
        "  }\n" +
        "}";

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 2500,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) throw new Error("Anthropic error: " + await response.text());

      const result = await response.json();
      const raw = result.content?.[0]?.text || "{}";
      const parsed = safeParseJson(raw);

      const reportData = {
        organisation_name: data.organisation,
        assessment_date: new Date().toISOString().slice(0, 10),
        scores,
        discuss_flags: discussFlags,
        priority_dimensions: priorityKeys,
        readiness_stage: readinessStage,
        key_findings: parsed.key_findings || [],
        recommendations: parsed.recommendations || {},
      };

      return new Response(JSON.stringify({
        report: parsed.narrative_report || "",
        report_data: reportData,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: (err as Error).message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
  }
};
