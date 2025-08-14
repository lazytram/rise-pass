"use client";

import { useMemo } from "react";
import { RISE_ROLES, type RiseRole } from "../../data/roles";

type Props = {
  selected: RiseRole;
  setSelected: (r: RiseRole) => void;
  secondaryKeys: string[];
  setSecondaryKeys: (keys: string[]) => void;
};

export default function RoleForm({
  selected,
  setSelected,
  secondaryKeys,
  setSecondaryKeys,
}: Props) {
  const secondaryCandidates = useMemo(
    () => RISE_ROLES.filter((r) => r.key !== selected.key),
    [selected]
  );

  return (
    <div>
      <label className="block text-sm mb-2 text-white/80">Select a role</label>
      <select
        className="w-full bg-black/30 border border-white/10 rounded-lg p-3"
        value={selected.key}
        onChange={(e) => {
          const next = RISE_ROLES.find((r) => r.key === e.target.value)!;
          setSelected(next);
          setSecondaryKeys(secondaryKeys.filter((k) => k !== next.key));
        }}
      >
        {RISE_ROLES.map((r) => (
          <option key={r.key} value={r.key}>
            {r.name}
          </option>
        ))}
      </select>

      <p className="text-white/60 text-sm mt-3">{selected.description}</p>

      <div className="mt-5">
        <div className="text-sm mb-2 text-white/80">
          Secondary roles (badges)
        </div>
        <div className="grid grid-cols-2 gap-2">
          {secondaryCandidates.map((r) => {
            const checked = secondaryKeys.includes(r.key);
            return (
              <label key={r.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-white/80"
                  checked={checked}
                  onChange={(e) => {
                    setSecondaryKeys(
                      e.target.checked
                        ? [...secondaryKeys, r.key]
                        : secondaryKeys.filter((k) => k !== r.key)
                    );
                  }}
                />
                <span>{r.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
