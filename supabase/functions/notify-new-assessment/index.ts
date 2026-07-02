import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const STAGE_NAMES = ["", "Digital Foundation", "Experimentation & Literacy", "Integration", "Optimisation", "Transformation"];

export default {
  fetch: async (req: Request) => {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    try {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");

      // Supabase database webhook sends: { type, table, schema, record, old_record }
      const payload = await req.json();
      const row = payload.record;
      if (!row) throw new Error("No record in webhook payload");

      const stageName = STAGE_NAMES[row.maturity_stage] || "Unknown";
      const dashboardUrl = "https://wiseintegrate.com/dashboard";
      const reportUrl = `https://wiseintegrate.com/report-summary?id=${row.id}`;

      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#111;">
          <div style="background:#1d4ed8;padding:22px 28px;border-radius:8px 8px 0 0;">
            <p style="color:rgba(255,255,255,0.7);margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;">WiseIntegrate</p>
            <h1 style="color:#fff;margin:0;font-size:20px;font-weight:bold;">New Assessment Submitted</h1>
          </div>
          <div style="padding:24px 28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
              <tr><td style="padding:6px 0;color:#6b7280;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${row.name || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Role</td><td style="padding:6px 0;">${row.role || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Organisation</td><td style="padding:6px 0;">${row.organisation || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;"><a href="mailto:${row.email}" style="color:#1d4ed8;">${row.email || "—"}</a></td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Type</td><td style="padding:6px 0;">${row.org_type || "—"} · ${row.org_size || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Location</td><td style="padding:6px 0;">${row.location || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Stage</td><td style="padding:6px 0;font-weight:600;">Stage ${row.maturity_stage || "?"} — ${stageName}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Score</td><td style="padding:6px 0;">${row.total_score || 0}/180</td></tr>
            </table>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <a href="${dashboardUrl}" style="display:inline-block;background:#1d4ed8;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">Open Dashboard</a>
              <a href="${reportUrl}" style="display:inline-block;background:#fff;color:#1d4ed8;border:1px solid #1d4ed8;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">View Report</a>
            </div>
            <p style="margin:20px 0 0;font-size:11px;color:#9ca3af;">Run Generate Report from the dashboard before sharing the report link with the client.</p>
          </div>
        </div>
      `;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "WiseIntegrate <hello@wiseintegrate.com>",
          to: ["hello@wiseintegrate.com"],
          subject: `New Assessment: ${row.name || "Unknown"} — ${row.organisation || ""}`,
          html,
        }),
      });

      if (!res.ok) throw new Error(`Resend error: ${await res.text()}`);

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
