-- Run ONLY after the rebuilt site (which saves and reads assessments through its server) is live,
-- and SUPABASE_SERVICE_ROLE_KEY is set in Vercel. Needs Dr. Brancken's approval.
-- Before: anyone with the public anon key could read, change and add assessment rows (names, emails, phones).
-- After: the public key has no access; only the server (service role) can read and write.

drop policy if exists "Allow read for dashboard" on public.ai_assessments;
drop policy if exists "Allow update notes" on public.ai_assessments;
drop policy if exists "Allow insert from anyone" on public.ai_assessments;

alter table public.ai_assessments enable row level security;
