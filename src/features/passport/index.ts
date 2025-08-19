// Export all passport feature functionality
export * from "./types";
export * from "./components";
export * from "./services/svg";

// Main exports for backward compatibility
export { PassportCard } from "./components";
export { generatePassportSVG } from "./services/svg";
export type { PassportData, PassportCardProps } from "./types";
