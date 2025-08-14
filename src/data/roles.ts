export type RiseRole = {
  key: string;
  name: string;
  color: string;
  description: string;
};

export const RISE_ROLES: RiseRole[] = [
  {
    key: "noob",
    name: "Noob",
    color: "#ff3df5",
    description: "New to RISE, ready to level up.",
  },
  {
    key: "rice",
    name: "Rice",
    color: "#ffd400",
    description:
      "Level 3 unlocked: access to share-on-twitter & hat-pfp. Let’s flood X with RISE.",
  },
  {
    key: "rice-contributor",
    name: "Rice Contributor",
    color: "#ff8c3a",
    description: "RISE Chain dev. We ship for the ecosystem.",
  },
  {
    key: "shredded",
    name: "SHREDDED",
    color: "#8f6aff",
    description:
      "Wear the RISE Hat in your PFP. Brand kit on, identity on‑point.",
  },
  {
    key: "initiate",
    name: "initiate",
    color: "#ff6b4a",
    description:
      "Own the first RISE Chain NFT on Ethereum. Ownership verified via Guild.",
  },
  {
    key: "rise-celeb",
    name: "RISE celeb",
    color: "#2ad398",
    description: "Weekly Community MVP. Monster engagement — you shine.",
  },
  {
    key: "ambassador",
    name: "Ambassador",
    color: "#ff9a66",
    description: "Local ambassador: you organize, connect, and grow RISE.",
  },
  {
    key: "risu",
    name: "Risu",
    color: "#2ecc71",
    description:
      "Community pillar: AMAs, content, initiatives, positive vibes.",
  },
  {
    key: "san",
    name: "San",
    color: "#7e57c2",
    description: "Risu San: the elite of the community. Period.",
  },
];
