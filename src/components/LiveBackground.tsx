/**
 * The slowly moving blue light and faint contour lines behind the whole site (a hint of the Command Centre look).
 * Pure CSS animation in globals.css (transform only), switched off when the visitor asks for less motion.
 */
export function LiveBackground() {
  return (
    <div className="live-bg" aria-hidden="true">
      <span className="live-bg__a" />
      <span className="live-bg__b" />
      <span className="live-bg__c" />
    </div>
  );
}
