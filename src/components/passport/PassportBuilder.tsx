"use client";

import { useMemo, useState } from "react";
import { RISE_ROLES, type RiseRole } from "../../data/roles";
import PassportCard from "./PassportCard";
import RoleForm from "./RoleForm";
import ActionBar from "./ActionBar";
import { buildTweet } from "../../lib/tweet";

export enum BuilderState {
  Select = "select",
  Reveal = "reveal",
}

export default function PassportBuilder() {
  const [state, setState] = useState<BuilderState>(BuilderState.Select);
  const [selected, setSelected] = useState<RiseRole>(RISE_ROLES[0]);
  const [secondaryKeys, setSecondaryKeys] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState<string>("RISE User");

  const tweet = useMemo(() => buildTweet(selected.name), [selected]);

  const secondaryRoles = useMemo(
    () =>
      RISE_ROLES.filter(
        (r) => r.key !== selected.key && secondaryKeys.includes(r.key)
      ).map((r) => ({ name: r.name, color: r.color })),
    [selected, secondaryKeys]
  );

  const isGenerateDisabled = secondaryKeys.length === 0;

  if (typeof window !== "undefined") {
    window.addEventListener("passport:setName", (e: Event) => {
      const custom = e as CustomEvent<string>;
      setDisplayName(custom.detail || "RISE User");
    });
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {state === BuilderState.Select ? (
        <div className="w-full flex flex-col items-center text-center gap-6">
          <RoleForm
            selected={selected}
            setSelected={setSelected}
            secondaryKeys={secondaryKeys}
            setSecondaryKeys={setSecondaryKeys}
          />
          <ActionBar
            mode={BuilderState.Select}
            onGenerate={() => setState(BuilderState.Reveal)}
            disabledGenerate={isGenerateDisabled}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-6">
          <PassportCard
            username={displayName}
            avatarUrl=""
            roleName={selected.name}
            roleDescription={selected.description}
            color={selected.color}
            secondaryRoles={secondaryRoles}
          />
          <ActionBar
            mode={BuilderState.Reveal}
            onRedo={() => setState(BuilderState.Select)}
            tweet={tweet}
          />
        </div>
      )}
    </div>
  );
}
