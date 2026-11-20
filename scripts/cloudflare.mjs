// Builds (and optionally publishes) the site for Cloudflare. SITE_ENV=production keeps sales off and Google listing on.
// npm run cf:build   build only        npm run cf:preview   build and run on this computer (port 8787)
// npm run cf:deploy  build and publish (publish at most once or twice a day, after Dr. Brancken's yes)
import { execSync } from "node:child_process";
const step = process.argv[2] || "build";
const env = { ...process.env, SITE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1" };
const run = (c) => execSync(c, { stdio: "inherit", env });
run("npx opennextjs-cloudflare build");
if (step === "preview") run("npx opennextjs-cloudflare preview --port 8787");
if (step === "deploy") run("npx opennextjs-cloudflare deploy");
