"use client";

import { useMemo, useState } from "react";
import { RISE_ROLES, type RiseRole } from "../../data/roles";
import PassportCard from "./PassportCard";
import RoleForm from "./RoleForm";
import Button from "../ui/Button";
import TwitterShareButton from "../TwitterShareButton";

type BuilderState = "select" | "reveal";

export default function PassportBuilder() {
  const [state, setState] = useState<BuilderState>("select");
  const [selected, setSelected] = useState<RiseRole>(RISE_ROLES[0]);
  const [secondaryKeys, setSecondaryKeys] = useState<string[]>(
    RISE_ROLES.filter((r) => r.key !== RISE_ROLES[0].key).map((r) => r.key)
  );

  const tweet = useMemo(
    () =>
      `My #RISE Passport ✨\nPrimary role: ${selected.name}\nJoin us and build on RISE!`,
    [selected]
  );

  const secondaryRoles = useMemo(
    () =>
      RISE_ROLES.filter(
        (r) => r.key !== selected.key && secondaryKeys.includes(r.key)
      ).map((r) => ({ name: r.name, color: r.color })),
    [selected, secondaryKeys]
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      {state === "select" ? (
        <>
          <RoleForm
            selected={selected}
            setSelected={setSelected}
            secondaryKeys={secondaryKeys}
            setSecondaryKeys={setSecondaryKeys}
          />
          <div className="max-w-md">
            <PassportCard
              username="RISE User"
              avatarUrl="/solgaleo.png"
              roleName={selected.name}
              roleDescription={selected.description}
              color={selected.color}
              secondaryRoles={secondaryRoles}
            />
            <div className="mt-4 flex gap-3">
              <Button onClick={() => setState("reveal")}>Reveal</Button>
            </div>
          </div>
        </>
      ) : (
        <div className="md:col-span-2 flex flex-col md:flex-row items-start gap-6">
          <PassportCard
            username="RISE User"
            avatarUrl="/solgaleo.png"
            roleName={selected.name}
            roleDescription={selected.description}
            color={selected.color}
            secondaryRoles={secondaryRoles}
          />
          <div className="flex gap-3">
            <TwitterShareButton text={tweet} hashtags={["RISE", "Gigagas"]} />
            <Button variant="secondary" onClick={() => setState("select")}>
              Redo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
