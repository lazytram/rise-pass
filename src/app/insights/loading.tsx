import { LoadingSpinner } from "@/features/ui/components";

export default function Loading() {
  return (
    <div className="py-10">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3">
          <LoadingSpinner message="Loading insights…" size="lg" />
        </div>
      </div>
    </div>
  );
}
