export type Branch = {
  id: string;
  name: string;
  role: string;
  tagline: string;
  icon: "wholesale" | "pump" | "plumbing";
  accent: string; // tailwind gradient classes for the card badge
  location: {
    label: string;
    address: string;
    mapsUrl: string;
  };
  phones: { label: string; number: string }[];
  bank: {
    name: string;
    bank: string;
    account: string;
    branch: string;
    ifsc: string;
    upi: string;
  };
  products: string[];
};

// Shared banking info (same account across the firm — from the letterhead)
const BANK = {
  name: "SURYA PIPE TRADER",
  bank: "Tamilnad Mercantile Bank",
  account: "093539842155025",
  branch: "Simmakkal",
  ifsc: "TMBL0000093",
  upi: "suriyapipetrader@tmb",
};

export const BRANCHES: Branch[] = [
  {
    id: "head-office",
    name: "Head Office",
    role: "B2B · Wholesale Sales Point",
    tagline: "Bulk & business-to-business supply",
    icon: "wholesale",
    accent: "from-navy to-navy-light",
    location: {
      label: "Simmakkal, Madurai",
      address:
        "34, North Masi Street (opp. Krishnan Kovil), Simmakkal, Madurai – 625 001",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=34+North+Masi+Street+Simmakkal+Madurai+625001",
    },
    phones: [
      { label: "Office", number: "0452-4377976" },
      { label: "Sales", number: "98421 55025" },
      { label: "Despatch", number: "93421 55025" },
    ],
    bank: BANK,
    products: [
      "Wholesale plumbing supply",
      "Dealer & contractor orders",
      "Bulk pipe & fittings",
      "B2B sales point",
    ],
  },
  {
    id: "pump-division",
    name: "Texmo Taro Pump Division",
    role: "Pumps & Water Systems",
    tagline: "Booster, submersible & solar pumps",
    icon: "pump",
    accent: "from-gold-dark to-gold",
    location: {
      label: "Suruttikulam Godown, Madurai",
      address: "137/95, Suruttikulam, Madurai – 625 001",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=137%2F95+Suruttikulam+Madurai+625001",
    },
    phones: [
      { label: "Sales", number: "94878 68000" },
      { label: "Sales", number: "96887 09629" },
      { label: "Accounts", number: "98421 64045" },
      { label: "Office", number: "0452-4377978" },
    ],
    bank: BANK,
    products: [
      "Texmo & Taro pumps",
      "Grundfos booster pumps",
      "Solar water heaters",
      "Water heaters",
    ],
  },
  {
    id: "plumbing-division",
    name: "Plumbing & Sanitaryware",
    role: "Bath Fittings · Retail Showroom",
    tagline: "Complete bath & sanitary solutions",
    icon: "plumbing",
    accent: "from-navy-light to-gold-dark",
    location: {
      label: "North Masi Street, Madurai",
      address:
        "34, North Masi Street (opp. South Krishnan Koil St.), Madurai – 625 001",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Surya+Pipe+Trader+North+Masi+Street+Madurai+625001",
    },
    phones: [
      { label: "Showroom", number: "98423 50025" },
      { label: "Sales", number: "94878 68000" },
    ],
    bank: BANK,
    products: [
      "Jaquar · Kohler · Grohe bath fittings",
      "Concealed cisterns (Geberit, Viega)",
      "Kitchen sinks (Nirali, Carysil)",
      "Sanitaryware (Parryware)",
    ],
  },
];

export const COMPANY = {
  name: "SURYA PIPE TRADER",
  tagline: "Plumbing · Bath Fittings · Sanitary Ware",
  since: "25+ years in Madurai",
  phone: "98421 55025",
  phoneDial: "+919842155025",
  email: "suryapipetrader@gmail.com",
  brands: [
    "Ashirvad",
    "Jaquar",
    "Kohler",
    "Grohe",
    "Geberit",
    "Taro Pumps",
    "Grundfos",
    "Parryware",
    "V-Guard",
    "Zoloto",
    "Viega",
    "Zero B",
  ],
};
