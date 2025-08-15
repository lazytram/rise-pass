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
    color: "#f1c40f",
    priority: 2,
    description: "Steamed, seasoned, and ready to rise 🍚",
  },
  {
    id: "1281173780600983552",
    name: "Rice Contributor",
    color: "#ff8c3a",
    priority: 3,
    description: "Lines of code = grains of rice. You’re feeding the chain 🧑‍💻",
  },
  {
    id: "1371741508906254376",
    name: "SHREDDED",
    color: "#9b59b6",
    priority: 4,
    description: "Wears the RISE hat like a samurai wears armor 🧢⚔️",
  },
  {
    id: "1288877799569883250",
    name: "initiate",
    color: "#ff6b4a",
    priority: 5,
    description: "First to mint, first to rise. OG of the chain 🔗",
  },
  {
    id: "1383352993201782804",
    name: "RISE Racer",
    color: "#992d22",
    priority: 6,
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
    priority: 6,
    description: "Too famous for Discord. Yet here you are, blessing us 👑",
  },
  {
    id: "1353966994394710089",
    name: "Ambassador",
    color: "#f8d184",
    priority: 7,
    description: "Spreading RICE wisdom from Tokyo to Timbuktu 🌍🍥",
  },
  {
    id: "1362428482117832888",
    name: "Ambassador II",
    color: "#ecb56b",
    priority: 8,
    description: "S-class emissary of the Rise dojo. Fluent in all dialects 🧭",
  },
  {
    id: "1244633693780312174",
    name: "Risu",
    color: "#5fe192",
    priority: 9,
    description:
      "Guardian of the Grain. Your community karma is overflowing 🧘‍♂️🌾",
  },
  {
    id: "1266213843361595404",
    name: "San",
    color: "#a0b6ff",
    priority: 10,
    description:
      "Legend of the RICE temple. You’ve reached inner-chain peace 🏯",
  },
  {
    id: "1324244561731649567",
    name: "Content Creator",
    color: "#208b4c",
    priority: 6,
    description: "Crafting pixels, pumping vibes, farming retweets 🎨🌀",
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
      "You don’t just follow the chain — you forge it. Architects of RISE, one block at a time 🔧🚀",
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
