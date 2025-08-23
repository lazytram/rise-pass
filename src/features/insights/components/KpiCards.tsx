"use client";
import Card from "@/components/ui/Card";
import { CountUp, LoadingSpinner } from "@/features/ui/components";
import { useTotalMintedQuery, useUniqueHoldersQuery } from "./Queries";
import { JSX } from "react";

type KpiCardProps = {
  title: string;
  value: number | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
  badgeGradientClass: string;
  icon: JSX.Element;
};

function KpiCard({
  title,
  value,
  isLoading,
  isFetching,
  isError,
  onRetry,
  badgeGradientClass,
  icon,
}: KpiCardProps) {
  const hasData = typeof value === "number" && Number.isFinite(value);

  return (
    <div className="group relative">
      <Card className="flex flex-col items-center text-center space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gradient-to-br from-white/15 to-white/8 border border-white/25 hover:border-white/50 transition-all duration-300 hover:scale-105">
        <div className="relative">
          <div
            className={`w-12 h-12 bg-gradient-to-r ${badgeGradientClass} rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:shadow-purple-500/60 transition-all duration-300`}
          >
            {icon}
          </div>
          <div
            className={`absolute inset-0 bg-gradient-to-r ${badgeGradientClass} rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300`}
          ></div>
        </div>
        <div>
          <h4 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">
            {title}
          </h4>

          {isLoading && !hasData ? (
            <div className="flex items-center justify-center h-8">
              <LoadingSpinner size="sm" />
            </div>
          ) : isError && !hasData ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-red-300 text-sm">Error loading</p>
              <button
                onClick={onRetry}
                className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-white text-xs hover:bg-white/15"
              >
                Retry
              </button>
            </div>
          ) : (
            <CountUp
              value={hasData ? (value as number) : 0}
              className="text-white font-mono tabular-nums text-xl sm:text-2xl"
            />
          )}

          {isFetching && hasData && (
            <p className="text-white/50 text-[11px] mt-1">Updating…</p>
          )}

          {isError && hasData && (
            <p className="text-yellow-300/80 text-[11px] mt-1">
              Showing last value
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

export function TotalMintedKpi() {
  const { data, isLoading, isFetching, isError, refetch } =
    useTotalMintedQuery();
  return (
    <KpiCard
      title="Total minted"
      value={data}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={!!isError}
      onRetry={() => refetch()}
      badgeGradientClass="from-[#8b5cf6] to-[#ec4899]"
      icon={
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          role="img"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="rotate(180 12 12)"
          >
            {/* Cover with softer corners */}
            <rect x="5" y="3" width="13" height="18" rx="3" />
            {/* Spine slightly inset */}
            <path d="M8 3v18" />
            {/* Globe emblem centered */}
            <circle cx="14" cy="12" r="3" />
            <path d="M11 12h6" />
            <path d="M14 9c1.2 1.4 1.2 5 0 6" />
            <path d="M14 9c-1.2 1.4-1.2 5 0 6" />
          </g>
        </svg>
      }
    />
  );
}

export function UniqueHoldersKpi() {
  const { data, isLoading, isFetching, isError, refetch } =
    useUniqueHoldersQuery();
  return (
    <KpiCard
      title="Unique holders"
      value={data}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={!!isError}
      onRetry={() => refetch()}
      badgeGradientClass="from-[#ec4899] to-[#f59e0b]"
      icon={
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z" />
          <path d="M8 13c2.21 0 4-2.015 4-4.5S10.21 4 8 4 4 6.015 4 8.5 5.79 13 8 13z" />
          <path d="M2.5 20a5.5 5.5 0 0111 0v1.5H2.5V20z" />
          <path d="M14.5 21.5V20a4.5 4.5 0 019 0v1.5h-9z" />
        </svg>
      }
    />
  );
}
