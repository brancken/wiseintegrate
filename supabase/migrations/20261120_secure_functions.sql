-- WiseIntegrate (20 Nov 2026): the website saves and reads assessments ONLY through these functions,
-- so neither the browser nor the website needs the Supabase secret key, and the public anon key needs no
-- direct table access (that is closed later by 20261120_close_anon_access.sql, at go-live).
-- Run BEFORE the new site goes live (needs Dr. Brancken's approval). Additive: the old site keeps working.
-- The dashboard password fingerprint is set separately from a private file (never in this public repo).
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.wi_admin (id int primary key default 1 check (id = 1), salt text not null, pass_hash text not null);
create table if not exists private.wi_admin_sessions (token text primary key, expires timestamptz not null);
create table if not exists private.wi_admin_failures (at timestamptz not null default now());

-- Public assessment form: insert one submission, return its id.
create or replace function public.wi_submit_assessment(p jsonb) returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare r public.ai_assessments; new_id uuid;
begin
  r := jsonb_populate_record(null::public.ai_assessments, p);
  if coalesce(trim(r.name), '') = '' then raise exception 'name required'; end if;
  insert into public.ai_assessments (submitted_at, name, role, organisation, email, phone, location, org_type, org_size, staff_count, ai_usage, prompt_reason,
    d1_leadership, d2_data, d3_literacy, d4_governance, d5_usage, d6_departments, d7_security, d8_budget, total_score, maturity_stage,
    q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,q21,q22,q23,q24,q25,q26,q27,q28,q29,q30,q31,q32,q33,q34,q35,q36,q37,q38,q39,q40,q41,q42,q43,q44,q45)
  values (now(), left(r.name,200), left(r.role,200), left(r.organisation,200), left(r.email,200), left(r.phone,60), left(r.location,200), left(r.org_type,60), left(r.org_size,60), left(r.staff_count,60), left(r.ai_usage,200), left(r.prompt_reason,2000),
    r.d1_leadership, r.d2_data, r.d3_literacy, r.d4_governance, r.d5_usage, r.d6_departments, r.d7_security, r.d8_budget, r.total_score, r.maturity_stage,
    r.q1,r.q2,r.q3,r.q4,r.q5,r.q6,r.q7,r.q8,r.q9,r.q10,r.q11,r.q12,r.q13,r.q14,r.q15,r.q16,r.q17,r.q18,r.q19,r.q20,r.q21,r.q22,r.q23,r.q24,r.q25,r.q26,r.q27,r.q28,r.q29,r.q30,r.q31,r.q32,r.q33,r.q34,r.q35,r.q36,r.q37,r.q38,r.q39,r.q40,r.q41,r.q42,r.q43,r.q44,r.q45)
  returning id into new_id;
  return new_id;
end $$;

-- The AI report for a NEW submission can be saved once, within 15 minutes of submitting.
create or replace function public.wi_save_first_report(p_id uuid, p_report text, p_data jsonb) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  update public.ai_assessments set ai_report = p_report, report_data = p_data
   where id = p_id and ai_report is null and report_data is null and submitted_at > now() - interval '15 minutes';
  return found;
end $$;

-- Consultant dashboard: password login gives a 12-hour session token. 10 wrong tries in 15 minutes locks it.
create or replace function public.wi_admin_login(p_pass text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare a private.wi_admin; t text;
begin
  if (select count(*) from private.wi_admin_failures where at > now() - interval '15 minutes') >= 10 then
    raise exception 'Too many tries. Please wait 15 minutes.';
  end if;
  select * into a from private.wi_admin where id = 1;
  if a is null or encode(digest(a.salt || coalesce(p_pass,''), 'sha256'), 'hex') <> a.pass_hash then
    insert into private.wi_admin_failures default values;
    perform pg_sleep(0.5);
    return null;
  end if;
  delete from private.wi_admin_sessions where expires < now();
  delete from private.wi_admin_failures where at < now() - interval '1 day';
  t := encode(gen_random_bytes(32), 'hex');
  insert into private.wi_admin_sessions values (t, now() + interval '12 hours');
  return t;
end $$;

create or replace function private.wi_admin_ok(p_token text) returns boolean
language sql security definer set search_path = public as $$
  select exists (select 1 from private.wi_admin_sessions where token = p_token and expires > now());
$$;

create or replace function public.wi_admin_logout(p_token text) returns void
language sql security definer set search_path = public as $$ delete from private.wi_admin_sessions where token = p_token; $$;

create or replace function public.wi_admin_list(p_token text) returns setof public.ai_assessments
language plpgsql security definer set search_path = public as $$
begin
  if not private.wi_admin_ok(p_token) then raise exception 'not signed in'; end if;
  return query select * from public.ai_assessments order by submitted_at desc nulls last;
end $$;

create or replace function public.wi_admin_get(p_token text, p_id uuid) returns public.ai_assessments
language plpgsql security definer set search_path = public as $$
declare r public.ai_assessments;
begin
  if not private.wi_admin_ok(p_token) then raise exception 'not signed in'; end if;
  select * into r from public.ai_assessments where id = p_id;
  return r;
end $$;

create or replace function public.wi_admin_set_notes(p_token text, p_id uuid, p_notes text) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not private.wi_admin_ok(p_token) then raise exception 'not signed in'; end if;
  update public.ai_assessments set consultant_notes = p_notes where id = p_id;
  return found;
end $$;

create or replace function public.wi_admin_save_report(p_token text, p_id uuid, p_report text, p_data jsonb) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not private.wi_admin_ok(p_token) then raise exception 'not signed in'; end if;
  update public.ai_assessments set report_data = p_data, ai_report = coalesce(p_report, ai_report) where id = p_id;
  return found;
end $$;

create or replace function public.wi_admin_set_password(p_token text, p_new text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare s text := encode(gen_random_bytes(16), 'hex');
begin
  if not private.wi_admin_ok(p_token) then raise exception 'not signed in'; end if;
  if length(coalesce(p_new,'')) < 12 then raise exception 'Use at least 12 characters.'; end if;
  update private.wi_admin set salt = s, pass_hash = encode(digest(s || p_new, 'sha256'), 'hex') where id = 1;
  delete from private.wi_admin_sessions where token <> p_token;
  return true;
end $$;

revoke all on function public.wi_submit_assessment(jsonb), public.wi_save_first_report(uuid, text, jsonb), public.wi_admin_login(text),
  public.wi_admin_logout(text), public.wi_admin_list(text), public.wi_admin_get(text, uuid), public.wi_admin_set_notes(text, uuid, text),
  public.wi_admin_save_report(text, uuid, text, jsonb), public.wi_admin_set_password(text, text) from public;
grant execute on function public.wi_submit_assessment(jsonb), public.wi_save_first_report(uuid, text, jsonb), public.wi_admin_login(text),
  public.wi_admin_logout(text), public.wi_admin_list(text), public.wi_admin_get(text, uuid), public.wi_admin_set_notes(text, uuid, text),
  public.wi_admin_save_report(text, uuid, text, jsonb), public.wi_admin_set_password(text, text) to anon, authenticated;
revoke all on function private.wi_admin_ok(text) from public, anon, authenticated;
