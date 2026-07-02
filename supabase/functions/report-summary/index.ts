import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export default {
  fetch: async (req: Request) => {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return jsonResponse({ error: "No assessment ID provided." }, 400);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return jsonResponse({ error: "Server configuration error." }, 500);
    }

    const restUrl = `${SUPABASE_URL}/rest/v1/ai_assessments?id=eq.${encodeURIComponent(id)}&select=organisation,report_data`;
    const dbResp = await fetch(restUrl, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });

    if (!dbResp.ok) return jsonResponse({ error: "Could not retrieve assessment." }, 502);

    const rows = await dbResp.json();
    if (!rows || rows.length === 0 || !rows[0].report_data) {
      return jsonResponse({ error: "No report data found for this assessment. Run Generate Report first." }, 404);
    }

    const reportData = rows[0].report_data;
    if (!reportData.organisation_name) {
      reportData.organisation_name = rows[0].organisation || "—";
    }

    return jsonResponse(reportData);
  },
};
