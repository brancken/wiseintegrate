// /api/thank-you-code?session_id=cs_...  (DRAFT, not published)
// After a buyer pays through a How to Make a Website payment link, their private course page calls this to show their own
// single-use 20% thank-you code. It checks with Stripe that the checkout session is really paid, then returns the code for that
// session (making it the first time). The same session always gets the same code, so reloading the page is safe.
//
// Needs two Vercel environment variables (Dr. Brancken pastes them in Vercel himself; never in code or chat):
//   STRIPE_SECRET_KEY        the secret key (sk_test_... while testing, sk_live_... when live)
//   STRIPE_THANKYOU_COUPON   the coupon ID of the 20% thank-you coupon (sandbox: NxwQfjiD)

const STRIPE = 'https://api.stripe.com/v1';
const DAYS = 30;

async function stripe(path, method = 'GET', body) {
  const r = await fetch(STRIPE + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
  });
  return { ok: r.ok, data: await r.json() };
}

function nice(ts) {
  return new Date(ts * 1000).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' });
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  const id = String((req.query && req.query.session_id) || '');
  if (!/^cs_(test|live)_[A-Za-z0-9]{10,}$/.test(id)) return res.status(400).json({ error: 'bad session' });
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_THANKYOU_COUPON) return res.status(503).json({ error: 'not set up' });

  const s = await stripe('/checkout/sessions/' + encodeURIComponent(id));
  if (!s.ok || s.data.payment_status !== 'paid') return res.status(404).json({ error: 'not paid' });

  const code = 'THANKS-' + id.slice(-8).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
  const found = await stripe('/promotion_codes?limit=1&code=' + encodeURIComponent(code));
  if (found.ok && found.data.data && found.data.data.length) {
    const p = found.data.data[0];
    return res.status(200).json({ code: p.code, expires: p.expires_at ? nice(p.expires_at) : '' });
  }

  const expires = Math.floor(Date.now() / 1000) + DAYS * 86400;
  const made = await stripe('/promotion_codes', 'POST', {
    'promotion[type]': 'coupon',
    'promotion[coupon]': process.env.STRIPE_THANKYOU_COUPON,
    code,
    max_redemptions: '1',
    expires_at: String(expires),
    'metadata[checkout_session]': id,
  });
  if (!made.ok) return res.status(502).json({ error: 'could not make code' });
  return res.status(200).json({ code: made.data.code, expires: nice(expires) });
};
