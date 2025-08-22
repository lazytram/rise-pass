import { fetchTotalPassports } from "@/infrastructure/services/contracts";
import { GradientText } from "@/shared/components";
import Card from "@/components/ui/Card";

export default async function InsightsPage() {
  const totalMinted = await fetchTotalPassports();

  return (
    <div className="py-10">
      <div className="mb-8 text-center">
        <GradientText className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight">
          Passport Insights
        </GradientText>

        <div className="mt-6 flex justify-center">
          <Card className="inline-flex items-center gap-4 px-5 py-3 animate-fade-in-up">
            <p className="text-white/80 text-sm sm:text-base">
              Minted passports
            </p>

            <span className="relative">
              <span
                aria-hidden
                className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] opacity-50 blur-sm"
              ></span>
              <span className="relative px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white font-mono tabular-nums text-lg sm:text-xl shadow">
                {Intl.NumberFormat("en-US").format(Number(totalMinted))}
              </span>
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
