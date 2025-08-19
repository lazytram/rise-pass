import LoadingSpinner from "./LoadingSpinner";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner message={message} size="lg" />
    </div>
  );
}
