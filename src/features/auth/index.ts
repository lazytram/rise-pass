// Export all auth feature functionality
export * from "./types";
export * from "./components";

// Main exports for backward compatibility
export { DiscordStatusCard, DiscordLoginButton } from "./components";
export type { DiscordUser, DiscordMember, AuthSession } from "./types";
