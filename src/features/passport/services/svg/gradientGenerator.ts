/**
 * Generate SVG gradient definitions
 */
export function generateGradientDefinitions(roleColor: string): string {
  return `
    <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${roleColor};stop-opacity:1" />
      <stop offset="55%" style="stop-color:${roleColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.18" />
    </linearGradient>

    <radialGradient id="bodyGradient1" cx="80%" cy="-10%" r="800">
      <stop offset="0%" style="stop-color:${roleColor};stop-opacity:0.55" />
      <stop offset="50%" style="stop-color:${roleColor};stop-opacity:0" />
    </radialGradient>

    <radialGradient id="bodyGradient2" cx="-10%" cy="120%" r="900">
      <stop offset="0%" style="stop-color:${roleColor};stop-opacity:0.32" />
      <stop offset="55%" style="stop-color:${roleColor};stop-opacity:0" />
    </radialGradient>

    <linearGradient id="bodyGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${roleColor};stop-opacity:0.38" />
      <stop offset="62%" style="stop-color:#0a0a12;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="topBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${roleColor};stop-opacity:0.25" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.25" />
    </linearGradient>

    <linearGradient id="moveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.10" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.03" />
    </linearGradient>

    <linearGradient id="badgePanelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:0.35" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.18" />
    </linearGradient>

    <radialGradient id="glowGradient" cx="60%" cy="0%" r="120%">
      <stop offset="0%" style="stop-color:${roleColor};stop-opacity:0.28" />
      <stop offset="70%" style="stop-color:${roleColor};stop-opacity:0" />
    </radialGradient>

    <radialGradient id="glowGradient2" cx="0%" cy="100%" r="100%">
      <stop offset="0%" style="stop-color:${roleColor};stop-opacity:0.18" />
      <stop offset="70%" style="stop-color:${roleColor};stop-opacity:0" />
    </radialGradient>

    <pattern id="repeatingPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#ffffff" opacity="0.02"/>
      <rect x="8" y="8" width="8" height="8" fill="#000000" opacity="0.02"/>
    </pattern>
  `;
}
