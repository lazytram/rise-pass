export type Role = {
  id: string;
  name: string;
  color: string;
  priority: number;
  description: string;
};

export const DISCORD_ROLE_MAP: Array<Role> = [
  {
    id: "1244656709251629106",
    name: "Noob",
    color: "#ff3df5",
    priority: 1,
    description: "Just sprouted. Water me with good alpha 🌱",
  },
  {
    id: "1254025872630091797",
    name: "Rice",
    color: "#f39c12",
    priority: 2,
    description: "Steamed, seasoned, and ready to rise 🍚",
  },
  {
    id: "1281173780600983552",
    name: "Rice Contributor",
    color: "#ff8c3a",
    priority: 4,
    description: "Lines of code = grains of rice. You're feeding the chain 🧑‍💻",
  },
  {
    id: "1388002016009388062",
    name: "Giga Artist",
    color: "#dfb4af",
    priority: 6,
    description: "Drawing like a Giga Chad 🎨",
  },
  {
    id: "1371741508906254376",
    name: "SHREDDED",
    color: "#9b59b6",
    priority: 5,
    description: "Wears the RISE hat like a samurai wears armor 🧢⚔️",
  },
  {
    id: "1288877799569883250",
    name: "initiate",
    color: "#ff6b4a",
    priority: 3,
    description: "First to mint, first to rise. OG of the chain 🔗",
  },
  {
    id: "1383352993201782804",
    name: "RISE Racer",
    color: "#992d22",
    priority: 9,
    description: "Racing to the top of the chain 🚗🏁",
  },
  {
    id: "1298214534816993301",
    name: "Thaiji's ladyboy",
    color: "#9b59b6",
    priority: 7,
    description: "Thaiji's ladyboy 💅",
  },
  {
    id: "1327136898090664017",
    name: "RISE celeb",
    color: "#2ad398",
    priority: 8,
    description: "Too famous for Discord. Yet here you are, blessing us 👑",
  },
  {
    id: "1353966994394710089",
    name: "Ambassador",
    color: "#f8d184",
    priority: 14,
    description: "Spreading RICE wisdom from Tokyo to Timbuktu 🌍🍥",
  },
  {
    id: "1362428482117832888",
    name: "Ambassador II",
    color: "#ecb56b",
    priority: 13,
    description: "S-class emissary of the Rise dojo. Fluent in all dialects 🧭",
  },
  {
    id: "1244633693780312174",
    name: "Risu",
    color: "#5fe192",
    priority: 10,
    description:
      "Guardian of the Grain. Your community karma is overflowing 🧘‍♂️🌾",
  },
  {
    id: "1266213843361595404",
    name: "San",
    color: "#a0b6ff",
    priority: 11,
    description:
      "Legend of the RICE temple. You've reached inner-chain peace 🏯",
  },
  {
    id: "1324244561731649567",
    name: "Content Creator",
    color: "#208b4c",
    priority: 6,
    description: "Crafting pixels, pumping vibes, farming retweets 🎨🌀",
  },
  {
    id: "1291308118914895924",
    name: "Rise Dish",
    color: "#23c187",
    priority: 95,
    description: "Dishes out the RISE",
  },
  {
    id: "1341763629875204217",
    name: "Poker Champ",
    color: "#fbdb27",
    priority: 30,
    description: "Poker is life",
  },
  {
    id: "1280094822992183338",
    name: "Gold Digger",
    color: "#f14d1c",
    priority: 4,
    description: "No one can stop you from digging for gold 💰",
  },
];

export const RISE_SPECIAL_ROLES: Array<Role> = [
  {
    id: "1300862822514819224",
    name: "Community Moderator",
    color: "#ff8fc4",
    priority: 90,
    description: "Moderating the Rise Community. Keeping the peace.",
  },
  {
    id: "1400761591347154984",
    name: "Builder",
    color: "#e74b3c",
    priority: 90,
    description:
      "You don't just follow the chain — you forge it. Architects of RISE, one block at a time 🔧🚀",
  },
  {
    id: "1327257021480828958",
    name: "Core Team",
    color: "#f0bdef",
    priority: 100,
    description:
      "The minds behind RiseChain — visionaries turning ideas into code, and code into the future 🧠✨",
  },
];

export const RISE_APP_BUILDER_ROLES: Array<Role> = [
  {
    id: "1360090418741514331",
    name: "For The kingdom",
    color: "#fbdb47",
    priority: 99,
    description: "For the kingdom of RISE",
  },
  {
    id: "1360092748715131074",
    name: "GasPump",
    color: "#f14d1c",
    priority: 99,
    description: "Fueling the RISE chain",
  },
  {
    id: "1365700437927526412",
    name: "VeloxR",
    color: "#9b59b6",
    priority: 99,
    description:
      "NFTs without the lag — thanks to RiseChain, the blockchain built for speed.",
  },
  {
    id: "1361348485865017364",
    name: "NitroDeX",
    color: "#3498db",
    priority: 99,
    description: "The fastest DEX alive",
  },
];

export const FULL_ROLES_LIST: Array<Role> = [
  ...DISCORD_ROLE_MAP,
  ...RISE_SPECIAL_ROLES,
  ...RISE_APP_BUILDER_ROLES,
];
