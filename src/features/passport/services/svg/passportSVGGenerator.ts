import { PassportData } from "../../types";
import { generateBadgesHTML } from "./badgeGenerator";
import { generateGradientDefinitions } from "./gradientGenerator";

/**
 * Generate the complete SVG for a passport
 */
export function generatePassportSVG(passport: PassportData): string {
  const roleColor = passport.primaryRole?.color || "#7967e5";
  const username = passport.username || "User";
  const badgesHTML = generateBadgesHTML(passport);
  const gradientDefinitions = generateGradientDefinitions(roleColor);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="560" viewBox="0 0 360 560">
  <defs>
    ${gradientDefinitions}
  </defs>

  <ellipse cx="180" cy="280" rx="200" ry="300" fill="url(#glowGradient)" opacity="0.9"/>
  <ellipse cx="180" cy="560" rx="180" ry="200" fill="url(#glowGradient2)" opacity="0.9"/>

  <rect x="2" y="2" width="356" height="556" rx="16" fill="url(#frameGradient)"/>

  <rect x="4" y="4" width="352" height="552" rx="14" fill="url(#bodyGradient1)"/>
  <rect x="4" y="4" width="352" height="552" rx="14" fill="url(#bodyGradient2)"/>
  <rect x="4" y="4" width="352" height="552" rx="14" fill="url(#bodyGradient3)"/>
  <rect x="4" y="4" width="352" height="552" rx="14" fill="url(#repeatingPattern)"/>

  <rect x="4" y="4" width="352" height="552" rx="14" fill="url(#glowGradient)" opacity="0.28"/>

  <rect x="12" y="12" width="336" height="44" rx="12" fill="url(#topBarGradient)" stroke="#ffffff" stroke-width="1" opacity="0.12"/>

  <text x="22" y="40" font-family="Arial, sans-serif" font-size="18" font-weight="900" fill="white" letter-spacing="0.2">${username}</text>

  <!-- RISE Logo in top bar -->
  <g transform="translate(310, 20) scale(0.11)">
    <path fill="#fff" d="M176.12.391H.5888v50.3245H176.12c13.848 0 25.076 11.2676 25.076 25.1628v25.1627H77.3556c-42.3973 0-76.7668 34.369-76.7668 76.767V302.34H50.741V184.002L177.663 302.334h73.697L89.4198 151.366H201.196v-50.08h50.164V75.8783C251.36 34.1876 217.664.391 176.12.391Z"/>
  </g>

  <rect x="16" y="64" width="328" height="224" rx="12" fill="#1a1a1a" stroke="${roleColor}" stroke-width="1" opacity="0.35"/>

  <rect x="16" y="64" width="328" height="224" rx="12" fill="url(#bodyGradient1)" opacity="0.3"/>

  <rect x="16" y="64" width="328" height="224" rx="12" fill="url(#moveGradient)" opacity="0.12"/>

  <circle cx="180" cy="176" r="60" fill="${roleColor}" opacity="0.75" stroke="#ffffff" stroke-width="4"/>
  <circle cx="180" cy="176" r="56" fill="#1a1a1a"/>
  <circle cx="180" cy="176" r="52" fill="${roleColor}" opacity="0.1"/>

  <!-- RISE Logo -->
  <g transform="translate(154, 150) scale(0.2)">
    <path fill="#fff" d="M176.12.391H.5888v50.3245H176.12c13.848 0 25.076 11.2676 25.076 25.1628v25.1627H77.3556c-42.3973 0-76.7668 34.369-76.7668 76.767V302.34H50.741V184.002L177.663 302.334h73.697L89.4198 151.366H201.196v-50.08h50.164V75.8783C251.36 34.1876 217.664.391 176.12.391Z"/>
  </g>

  <circle cx="180" cy="176" r="70" fill="url(#glowGradient)" opacity="0.45"/>

  <rect x="120" y="300" width="120" height="36" rx="16" fill="url(#moveGradient)" stroke="${roleColor}" stroke-width="1.5" opacity="0.55"/>
  <circle cx="135" cy="318" r="4" fill="${roleColor}" opacity="0.8"/>
  <text x="180" y="322" font-family="Arial, sans-serif" font-size="12" font-weight="900" text-anchor="middle" fill="white" text-transform="uppercase" letter-spacing="0.28">${passport.primaryRole?.roleName}</text>

  <text x="180" y="360" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="white" opacity="0.88">Digital Identity in the RISE Ecosystem</text>

  <rect x="16" y="400" width="328" height="120" rx="12" fill="url(#badgePanelGradient)" stroke="#ffffff" stroke-width="1" opacity="0.08"/>

  ${badgesHTML}

  <text x="180" y="540" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="white" opacity="0.6">#${passport.discordId}</text>

  <rect x="4" y="4" width="352" height="552" rx="14" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.08"/>
</svg>`;
}
