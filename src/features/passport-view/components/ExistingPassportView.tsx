"use client";

import React from "react";
import { PassportCard } from "../../passport";
import {
  buildAvatarUrl,
  getDisplayName,
  DiscordMember,
} from "../../../lib/discordApi";
import ShareExportBar from "@/shared/components/ShareExportBar";
import { buildTweet } from "../../../lib/tweet";
import { canUpgradeRoleWithMember } from "../../../lib/discordRoleMap";
import { getExplorerUrl } from "../../../lib/config";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RoleUpgradeCard } from "../../minting";
import { DiscordUser } from "../../auth/types";

interface ExistingPassportViewProps {
  discordUser: DiscordUser | null;
  discordMember?: DiscordMember | null;
  roleName: string;
  roleId: string;
  discordId: string;
  mappedRoles?: {
    primary: {
      id: string;
      name: string;
      description?: string;
      color?: string;
    } | null;
    secondary: Array<{
      name: string;
      color?: string;
      description?: string;
    }>;
  };
  tokenId?: string | null;
}

export default function ExistingPassportView({
  discordUser,
  discordMember,
  roleName,
  roleId,
  discordId,
  mappedRoles,
  tokenId,
}: ExistingPassportViewProps) {
  // Real role upgrade check
  const upgradeInfo = canUpgradeRoleWithMember(roleId, discordMember || null);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Success Message */}
      <div className="text-center">
        <div className="inline-flex flex-col items-center px-8 py-6 bg-gradient-to-r from-[#7967e5]/20 to-[#ffa0f2]/20 border border-[#7967e5]/30 rounded-3xl backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-center mb-3">
            <span className="text-3xl mr-4">🎉</span>
            <p className="text-white text-xl font-bold">
              Your RISE Passport is Live!
            </p>
          </div>
          <p className="text-white/80 text-base text-center max-w-md">
            Your digital identity is permanently secured on the blockchain
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="space-y-8">
        {/* Passport Card */}
        <div className="flex justify-center">
          <div id="passport-card">
            <PassportCard
              username={discordUser ? getDisplayName(discordUser) : "User"}
              avatarUrl={discordUser ? buildAvatarUrl(discordUser) : undefined}
              roleName={roleName}
              color={mappedRoles?.primary?.color || "#6366f1"}
              roleId={roleId}
              discordId={discordId}
              secondaryRoles={mappedRoles?.secondary || []}
            />
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center">
          <div className="inline-flex items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <ConnectButton />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ShareExportBar targetId="passport-card" tweetText={buildTweet()} />
          <a
            href={getExplorerUrl(tokenId || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#7967e5]/20 to-[#ffa0f2]/20 hover:from-[#7967e5]/30 hover:to-[#ffa0f2]/30 text-white/90 hover:text-white text-sm font-semibold rounded-xl border border-[#7967e5]/30 hover:border-[#7967e5]/50 transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View on Explorer
          </a>
        </div>
      </div>

      {/* Role Upgrade Section */}
      {upgradeInfo.canUpgrade && upgradeInfo.highestAvailableRole && (
        <RoleUpgradeCard
          upgradeInfo={{
            highestAvailableRole: {
              name: upgradeInfo.highestAvailableRole.name,
            },
          }}
        />
      )}
    </div>
  );
}
