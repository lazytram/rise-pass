import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { DiscordStatusCardProps } from "../types";

export default function DiscordStatusCard({ session }: DiscordStatusCardProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-4 bg-gradient-to-r from-green-500/15 via-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl px-5 py-4 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/20">
          <Image
            src={(session.user?.image as string) || "/avatar-placeholder.svg"}
            alt="Discord avatar"
            className="w-full h-full object-cover"
            width={40}
            height={40}
          />
        </div>
        <div className="text-left">
          <p className="text-white/80 text-sm">Discord connected</p>
          <p className="text-white font-semibold leading-tight">
            {session.user?.name || "RISE User"}
          </p>
        </div>
        <Link
          href="/mint"
          className="ml-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/90 bg-gradient-to-r from-[#7967e5]/30 to-[#ffa0f2]/30 hover:from-[#7967e5]/40 hover:to-[#ffa0f2]/40 rounded-xl border border-white/20 transition-all"
        >
          <span>Go to Mint</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
        <button
          onClick={() => signOut()}
          className="ml-2 inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white/60 hover:text-white/80 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
