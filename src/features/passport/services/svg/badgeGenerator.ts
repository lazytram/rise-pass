import { PassportData, BadgeConfig } from "../../types";

const DEFAULT_BADGE_CONFIG: BadgeConfig = {
  maxBadges: 4,
  cardWidth: 328,
  badgeHeight: 24,
  badgeSpacing: 8,
  minBadgeWidth: 60,
  maxBadgeWidth: 100,
  textPadding: 16,
};

/**
 * Calculate badge widths based on text length
 */
function calculateBadgeWidths(
  badges: PassportData["secondaryRoles"],
  config: BadgeConfig
): number[] {
  return (badges || []).slice(0, config.maxBadges).map((badge) => {
    const textWidth = badge.name.length * 6; // Approximate width per character
    return Math.max(
      config.minBadgeWidth,
      Math.min(config.maxBadgeWidth, textWidth + config.textPadding)
    );
  });
}

/**
 * Calculate starting X position to center badges
 */
function calculateStartX(badgeWidths: number[], config: BadgeConfig): number {
  const totalWidth =
    badgeWidths.reduce((sum, width) => sum + width, 0) +
    config.badgeSpacing * (badgeWidths.length - 1);
  return 16 + (config.cardWidth - totalWidth) / 2;
}

/**
 * Generate badges HTML for the SVG
 */
export function generateBadgesHTML(
  passport: PassportData,
  config: BadgeConfig = DEFAULT_BADGE_CONFIG
): string {
  const badges = passport.secondaryRoles || [];
  const badgeWidths = calculateBadgeWidths(badges, config);
  const startX = calculateStartX(badgeWidths, config);

  let html = "";

  for (let i = 0; i < Math.min(badges.length, config.maxBadges); i++) {
    const badge = badges[i];
    const badgeWidth = badgeWidths[i];
    const x =
      startX +
      badgeWidths
        .slice(0, i)
        .reduce((sum, width) => sum + width + config.badgeSpacing, 0);
    const color = badge.color;

    html += `
      <rect x="${x}" y="420" width="${badgeWidth}" height="${
      config.badgeHeight
    }" rx="12" fill="${color}" opacity="0.8"/>
      <text x="${
        x + badgeWidth / 2
      }" y="435" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="white" font-weight="600">${
      badge.name
    }</text>
    `;
  }

  return html;
}
