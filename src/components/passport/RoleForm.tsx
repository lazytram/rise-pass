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
    <div className="w-full max-w-md mx-auto">
      <label className="block text-sm mb-2 text-white/80">Display name</label>
      <input
        type="text"
        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 mb-5"
        placeholder="Your name on the card"
        onChange={(e) => {
          window.dispatchEvent(
            new CustomEvent("passport:setName", { detail: e.target.value })
          );
        }}
      />

      <label className="block text-sm mb-2 text-white/80">Select a role</label>
      <select
        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'/></svg>')] bg-no-repeat bg-[right_12px_center] pr-10 cursor-pointer"
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
                  className="accent-white/80 cursor-pointer"
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
