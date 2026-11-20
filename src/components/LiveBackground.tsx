/**
 * The faint, slowly moving blue light behind the whole site, plus the SVG filter that gives the
 * Liquid Glass panels their slight edge ripple (used in globals.css; Chrome and Edge only, others get plain frosted glass).
 * Pure CSS animation (transform only), switched off when the visitor asks for less motion.
 */
export function LiveBackground() {
  return (
    <>
      <div className="live-bg" aria-hidden="true">
        <span className="live-bg__a" />
        <span className="live-bg__b" />
        <span className="live-bg__c" />
      </div>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <filter id="glass-distort" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </>
  );
}
