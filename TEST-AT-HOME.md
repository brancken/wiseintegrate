# Testing the new wiseintegrate.com at home (for Dr. Brancken)

The new site runs on this computer at **http://localhost:3077** (Firefox has a tab open). It is not on the internet yet.

## What you can test straight away
- Every page: Home, Shop, the course page, Churches, Business, Services, About, Blog, FAQ, Contact, the new **Free church management system** page, Terms of Sale and Refund Policy (both marked draft).
- Light and dark look: the sun/moon button at the top.
- Phone view: in Firefox press Ctrl + Shift + M, then choose a phone size.
- Install as an app: on your phone this only works once the site is live.

## Testing a real purchase (Stripe test mode, no real money): about 5 minutes
The Buy buttons need two keys that only you can copy. Claude never sees them.

1. Open the file `C:\Wise\websites\wiseintegrate\.env.local` in Notepad (right-click, Open with, Notepad).
2. **Stripe test key:** in the Stripe dashboard, switch to your **sandbox** (test mode), then Developers, API keys, **Secret key**, Reveal, Copy. Paste it after `STRIPE_SECRET_KEY=` (it starts with `sk_test_`).
3. **Supabase secret key:** supabase.com, the WiseIntegrate project, Project Settings, API keys, the **secret** (service role) key. Paste it after `SUPABASE_SERVICE_ROLE_KEY=`.
4. **Dashboard password:** type a NEW password after `ADMIN_PASSWORD=` (not the old one).
5. Save the file and tell Claude: "Keys are in". Claude then runs three things for you:
   - `scripts/stripe-setup.mjs`: makes the four products, prices, the 20% thank-you coupon and the Buy links in **your** Stripe sandbox, set to bring buyers back to the site.
   - `scripts/upload-downloads.mjs`: puts the four course ZIP files in a **private** storage area (never public, never on GitHub).
   - a rebuild of the site.
6. Then on the course page click a **Buy** button and pay with Stripe's test card **4242 4242 4242 4242**, any future date, any 3 digits, any name and email.
7. You should land on **your personal course page**: a Download button for your ZIP, the "Start here" steps, and your own 20% thank-you code.

## If something does not work
Tell Claude what you see (a screenshot helps). Nothing here can charge real money: test keys only work with test cards.
