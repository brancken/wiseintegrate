/** Shown on legal pages until Dr. Brancken has approved them (set approved = true in the page file). */
export function LegalDraftBar() {
  return (
    <p className="mb-8 rounded-2xl border-2 border-amber-500/60 bg-amber-500/10 p-4 text-sm">
      <strong>Draft for Dr. Brancken to approve.</strong> Not legal advice. Items in [square brackets] still need filling in before this page goes live.
    </p>
  );
}
