import { GradientText } from "@/shared/components";
import {
  TotalMintedKpi,
  UniqueHoldersKpi,
} from "@/features/insights/components/KpiCards";
export const dynamic = "force-dynamic";

export default function InsightsPage() {
  return (
    <div className="py-10">
      <div className="mb-8 text-center">
        <GradientText className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight">
          Passport Insights
        </GradientText>
        {/* KPIs styled like ProcessSteps cards, centered for two items */}
        <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto px-4 sm:px-6">
          <TotalMintedKpi />

          <UniqueHoldersKpi />
        </div>
      </div>
    </div>
  );
}
