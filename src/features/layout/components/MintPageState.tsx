import { LoadingState } from "../../ui";

interface MintPageStateProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function MintPageState({
  isLoading,
  children,
}: MintPageStateProps) {
  if (isLoading) {
    return <LoadingState message="Loading your passport..." />;
  }

  return <>{children}</>;
}
