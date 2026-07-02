import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const STAGES: Record<number, { name: string; description: string }> = {
  1: {
    name: "Digital Foundation",
    description: "Your organisation is in the early stages of building the digital and operational foundations needed before AI can be introduced effectively. This is a normal and important starting point — getting the basics right now makes everything easier later.",
  },
  2: {
    name: "Experimentation and Literacy",
    description: "You have some foundations in place and your organisation is ready to begin small, low-risk AI experiments. This is an exciting stage — the focus is on learning what works for your specific context before committing to anything larger.",
  },
  3: {
    name: "Integration",
    description: "You are actively integrating AI into core processes and building real organisational capability. Your team has moved beyond experimentation and AI is beginning to deliver tangible value across multiple areas.",
  },
  4: {
    name: "Optimisation",
    description: "AI is already part of how your organisation works and your focus is on improving and expanding its use. You are refining what works, addressing gaps, and looking for the next opportunities to create value.",
  },
  5: {
    name: "Transformation",
    description: "AI is embedded across your organisation and is actively driving strategic outcomes. You are operating at the leading edge of what is possible for your sector and focused on staying there.",
  },
};

export default {
  fetch: async (req: Request) => {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    try {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      const SUPABASE_URL   = Deno.env.get("SUPABASE_URL");
      const SERVICE_KEY    = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
      if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Supabase config missing");

      const { id } = await req.json();
      if (!id) throw new Error("No assessment ID provided");

      // Fetch the assessment row
      const dbResp = await fetch(
        `${SUPABASE_URL}/rest/v1/ai_assessments?id=eq.${encodeURIComponent(id)}&select=id,name,email,organisation,maturity_stage,total_score,report_data`,
        { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
      );
      if (!dbResp.ok) throw new Error("Could not retrieve assessment");
      const rows = await dbResp.json();
      if (!rows || rows.length === 0) throw new Error("Assessment not found");
      const row = rows[0];

      if (!row.email) throw new Error("No email address on this assessment");
      if (!row.report_data) throw new Error("No report generated yet. Run Generate Report from the dashboard first.");

      const stage = STAGES[row.maturity_stage] || { name: "Foundation", description: "Your assessment has been received and your consultant will be in touch shortly." };

      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;color:#111;">

          <!-- Header -->
          <div style="background:#1d4ed8;padding:28px;border-radius:8px 8px 0 0;">
            <p style="color:rgba(255,255,255,0.7);margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;">WiseIntegrate</p>
            <h1 style="color:#fff;margin:0;font-size:20px;font-weight:bold;">Your AI Readiness Result</h1>
          </div>

          <div style="padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">

            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">Hi ${row.name || "there"},</p>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#374151;">Thank you for completing the WiseIntegrate AI Readiness Assessment for <strong>${row.organisation || "your organisation"}</strong>. Here is your result.</p>

            <!-- Stage result -->
            <div style="background:#eff6ff;border-left:4px solid #1d4ed8;padding:20px 22px;border-radius:0 8px 8px 0;margin-bottom:28px;">
              <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;">Your AI Readiness Stage</p>
              <p style="margin:0 0 10px;font-size:22px;font-weight:bold;color:#1d4ed8;">Stage ${row.maturity_stage} &mdash; ${stage.name}</p>
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${stage.description}</p>
            </div>

            <!-- What's next -->
            <h2 style="font-size:15px;color:#111;margin:0 0 12px;padding-bottom:6px;border-bottom:2px solid #1d4ed8;">What happens next?</h2>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">Your full AI Readiness Report includes a detailed analysis across eight dimensions, your top priority gaps, and a personalised 90-day action plan designed specifically for ${row.organisation || "your organisation"}.</p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 24px;">To receive your full report, you can either get in touch with us directly or purchase it below.</p>

            <!-- CTAs -->
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">
              <a href="https://wiseintegrate.com/contact" style="display:inline-block;background:#1d4ed8;color:#fff;padding:13px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">Contact Us to Discuss</a>
              <a href="https://wiseintegrate.com/contact?ref=report-purchase" style="display:inline-block;background:#fff;color:#1d4ed8;border:1.5px solid #1d4ed8;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">Get Full Report &mdash; $50</a>
            </div>

            <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:16px;">This message was sent by WiseIntegrate following your AI Readiness Assessment. For questions, reply to this email or contact us at <a href="mailto:hello@wiseintegrate.com" style="color:#1d4ed8;">hello@wiseintegrate.com</a>.</p>
          </div>
        </div>
      `;

      // Send via Resend
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "WiseIntegrate <hello@wiseintegrate.com>",
          to: [row.email],
          subject: `Your AI Readiness Result — ${stage.name}`,
          html,
        }),
      });

      if (!emailRes.ok) throw new Error(`Resend error: ${await emailRes.text()}`);

      // Mark snapshot_sent = true
      await fetch(
        `${SUPABASE_URL}/rest/v1/ai_assessments?id=eq.${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ snapshot_sent: true }),
        }
      );

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: (err as Error).message }), {
        headers: { ...CORS, "Content-Type": "application/json" },
        status: 500,
      });
    }
  },
};
