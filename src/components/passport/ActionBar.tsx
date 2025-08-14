"use client";

import Button from "../ui/Button";
import TwitterShareButton from "../TwitterShareButton";
import { BuilderState } from "./PassportBuilder";

type Props = {
  mode: BuilderState;
  onGenerate?: () => void;
  onRedo?: () => void;
  tweet?: string;
  disabledGenerate?: boolean;
};

export default function ActionBar({
  mode,
  onGenerate,
  onRedo,
  tweet,
  disabledGenerate,
}: Props) {
  if (mode === "select") {
    return (
      <div className="max-w-md flex items-center gap-3">
        <Button onClick={onGenerate} disabled={disabledGenerate}>
          Generate
        </Button>
        {disabledGenerate ? (
          <span className="text-xs text-white/60">
            Select at least one secondary role
          </span>
        ) : null}
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      {tweet ? (
        <TwitterShareButton text={tweet} hashtags={["RISE", "Gigagas"]} />
      ) : null}
      <Button variant="secondary" onClick={onRedo}>
        Redo
      </Button>
    </div>
  );
}
