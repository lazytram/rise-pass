import React from "react";
import { MintFlowContainer } from "../../mint-flow";
import { MintButtonProps } from "../../minting/types";

interface MintPageStateManagerProps {
  hasRole: boolean;
  mintProps?: MintButtonProps;
}

export default function MintPageStateManager({
  hasRole,
  mintProps,
}: MintPageStateManagerProps) {
  return <MintFlowContainer {...mintProps} hasEligibleRole={hasRole} />;
}
