export type ProductColor =
  | "white"
  | "black"
  | "gold"
  | "gray"
  | "rgb"
  | "yellow"
  | "pink"
  | "teal"
  | "green"
  | "orange"
  | "purple";

export type Protocol = "wifi" | "zigbee" | "yandex";

export interface Product {
  id: string;
  slug: string;
  code: string;
  name: string;
  nameUz: string;
  category: string;
  price: number;
  currency: "USD";
  protocol: Protocol;
  colors: ProductColor[];
  shortDescription: string;
  description: string;
  specs: string[];
  image: string;
  imagesByColor?: Partial<Record<ProductColor, string>>;
  featured?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const colorLabels: Record<ProductColor, string> = {
  white: "Oq",
  black: "Qora",
  gold: "Oltin",
  gray: "Kulrang",
  rgb: "RGB",
  yellow: "Sariq",
  pink: "Pushti",
  teal: "Moviy",
  green: "Yashil",
  orange: "To‘q sariq",
  purple: "Binafsha",
};

export const categories: Category[] = [
  {
    id: "viklyuchatellar",
    slug: "viklyuchatellar",
    name: "Sensorli viklyuchatellar",
    description:
      "Wi-Fi orqali boshqariladigan sensorni shisha viklyuchatellar — 1G dan 4G gacha.",
    icon: "switch",
  },
  {
    id: "rele",
    slug: "rele",
    name: "Zigbee rele / modullar",
    description:
      "Yashirin o‘rnatiladigan Zigbee switch modullari — N va L variantlari.",
    icon: "module",
  },
  {
    id: "sensorlar",
    slug: "sensorlar",
    name: "Sensorlar va xavfsizlik",
    description:
      "Eshik, suv, tutun sensorlari va suv/gaz uchun smart motor.",
    icon: "sensor",
  },
  {
    id: "shlyuzlar",
    slug: "shlyuzlar",
    name: "Zigbee shlyuzlar",
    description: "Barcha Zigbee qurilmalarni birlashtiruvchi markaziy hub.",
    icon: "hub",
  },
  {
    id: "karnizlar",
    slug: "karnizlar",
    name: "Smart karnizlar",
    description: "3–6 metrli Wi-Fi avtomatik karnizlar — ovoz va ilova orqali.",
    icon: "curtain",
  },
  {
    id: "iqlim",
    slug: "iqlim",
    name: "Termostatlar",
    description: "Wi-Fi smart termostat — uy haroratini aniq boshqaring.",
    icon: "thermo",
  },
  {
    id: "yoritish",
    slug: "yoritish",
    name: "Yoritish va boshqaruv",
    description: "RGB smart lampochka va Wi-Fi IR pult.",
    icon: "bulb",
  },
  {
    id: "kolonkalar",
    slug: "kolonkalar",
    name: "Smart kolonkalar",
    description: "Yandex Stansiya Midi va Layt — ovozli yordamchi Alice.",
    icon: "speaker",
  },
];

export const products: Product[] = [
  {
    id: "VKL-001",
    slug: "vkl-001-sensor-1g-wifi",
    code: "VKL-001",
    name: "Smart sensor vkl -1G WI-FI",
    nameUz: "Sensorli viklyuchatel 1G Wi-Fi",
    category: "viklyuchatellar",
    price: 12,
    currency: "USD",
    protocol: "wifi",
    colors: ["white", "black", "gold", "gray"],
    shortDescription: "1 tugmali sensorni shisha viklyuchatel, Wi-Fi.",
    description:
      "Zamonaviy sensorni shisha panel. Bitta kanalni telefon ilovasi yoki ovozli yordamchi orqali boshqaring. Oq, qora, oltin va kulrang ranglar mavjud.",
    specs: ["1G (1 kanal)", "Wi-Fi", "Sensorni shisha panel", "4 rang"],
    image: "/products/VKL-001.png",
    featured: true,
  },
  {
    id: "VKL-002",
    slug: "vkl-002-sensor-2g-wifi",
    code: "VKL-002",
    name: "Smart sensor vkl -2G WI-FI",
    nameUz: "Sensorli viklyuchatel 2G Wi-Fi",
    category: "viklyuchatellar",
    price: 15,
    currency: "USD",
    protocol: "wifi",
    colors: ["white", "black", "gold", "gray"],
    shortDescription: "2 tugmali sensorni viklyuchatel, Wi-Fi.",
    description:
      "Ikki kanalli sensorni viklyuchatel. Yoritishni alohida zonalar bo‘yicha boshqarish uchun ideal. Ilova va ovoz orqali boshqaruv.",
    specs: ["2G (2 kanal)", "Wi-Fi", "Sensorni shisha panel", "4 rang"],
    image: "/products/VKL-002.png",
    featured: true,
  },
  {
    id: "VKL-003",
    slug: "vkl-003-sensor-3g-wifi",
    code: "VKL-003",
    name: "Smart sensor vkl -3G WI-FI",
    nameUz: "Sensorli viklyuchatel 3G Wi-Fi",
    category: "viklyuchatellar",
    price: 17,
    currency: "USD",
    protocol: "wifi",
    colors: ["white", "black", "gold", "gray"],
    shortDescription: "3 tugmali sensorni viklyuchatel, Wi-Fi.",
    description:
      "Uch kanalli sensorni panel — yashash xonasi yoki ofis uchun qulay. Smart uy tizimiga osongina ulanadi.",
    specs: ["3G (3 kanal)", "Wi-Fi", "Sensorni shisha panel", "4 rang"],
    image: "/products/VKL-003.png",
  },
  {
    id: "VKL-004",
    slug: "vkl-004-sensor-4g-wifi",
    code: "VKL-004",
    name: "Smart sensor vkl -4G WI-FI",
    nameUz: "Sensorli viklyuchatel 4G Wi-Fi",
    category: "viklyuchatellar",
    price: 19,
    currency: "USD",
    protocol: "wifi",
    colors: ["white", "black", "gold", "gray"],
    shortDescription: "4 tugmali sensorni viklyuchatel, Wi-Fi.",
    description:
      "To‘rt kanalli sensorni viklyuchatel. Katta xonalar va murakkab yoritish ssenariylari uchun.",
    specs: ["4G (4 kanal)", "Wi-Fi", "Sensorni shisha panel", "4 rang"],
    image: "/products/VKL-004.png",
  },
  {
    id: "SWN-001",
    slug: "swn-001-switch-1ch-zigbee",
    code: "SWN-001",
    name: "Smart switch -1ch ZIGBEE",
    nameUz: "Smart switch 1ch Zigbee",
    category: "rele",
    price: 8,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "1 kanalli yashirin Zigbee switch moduli.",
    description:
      "Mini Smart Switch moduli (ZigBee 3.0). Oddiy viklyuchatel ortiga o‘rnatiladi. AC 100–240V, 16A Max.",
    specs: [
      "1 kanal",
      "ZigBee 3.0",
      "AC 100–240V 50/60Hz",
      "16A Max",
      "Terminal: Lout, Lin, N, N, S1, S2",
    ],
    image: "/products/SWN-001.png",
    featured: true,
  },
  {
    id: "SWN-002",
    slug: "swn-002-switch-2ch-zigbee",
    code: "SWN-002",
    name: "Smart switch -2ch ZIGBEE",
    nameUz: "Smart switch 2ch Zigbee",
    category: "rele",
    price: 12,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "2 kanalli Zigbee switch moduli.",
    description:
      "2CH Zigbee Switch Module. LED yuklama: 2×150W / 2×5A. Neytral liniya bilan ishlaydi.",
    specs: [
      "2 kanal",
      "Zigbee",
      "AC 100–240V 50/60Hz",
      "LED 2×150W / 2×5A",
      "Terminal: L2, L, L1, N, S1, S2",
    ],
    image: "/products/SWN-002.png",
  },
  {
    id: "SWN-003",
    slug: "swn-003-switch-3ch-zigbee",
    code: "SWN-003",
    name: "Smart switch -3ch ZIGBEE",
    nameUz: "Smart switch 3ch Zigbee",
    category: "rele",
    price: 15,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "3 kanalli Zigbee switch moduli.",
    description:
      "3CH Zigbee Switch Module. LED: 3×150W / 3×3.3A. Tashqi simlar bilan.",
    specs: [
      "3 kanal",
      "Zigbee",
      "AC 100–240V 50/60Hz",
      "LED 3×150W / 3×3.3A",
      "Terminal: L2, L1, L, L3, N, COM",
    ],
    image: "/products/SWN-003.png",
  },
  {
    id: "SWN-004",
    slug: "swn-004-switch-4ch-zigbee",
    code: "SWN-004",
    name: "Smart switch -4ch ZIGBEE",
    nameUz: "Smart switch 4ch Zigbee",
    category: "rele",
    price: 18,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "4 kanalli Zigbee switch moduli.",
    description:
      "4CH Zigbee Switch Module. LED: 4×150W / 4×2.5A. Ko‘p zonali yoritish uchun.",
    specs: [
      "4 kanal",
      "Zigbee",
      "AC 100–240V 50/60Hz",
      "LED 4×150W / 4×2.5A",
      "Terminal: L1, L2, L3, L4, L, N",
    ],
    image: "/products/SWN-004.png",
  },
  {
    id: "SWL-001",
    slug: "swl-001-switch-1ch-l-zigbee",
    code: "SWL-001",
    name: "Smart switch -1ch L ZIGBEE",
    nameUz: "Smart switch 1ch L Zigbee",
    category: "rele",
    price: 12,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "1 kanalli L-tip Zigbee moduli (10–100W).",
    description:
      "1CH Zigbee Switch Module-L. Max load 10–100W. Neytral siz sxemalar uchun L-variant.",
    specs: [
      "1 kanal L",
      "Zigbee",
      "AC 100–240V 50/60Hz",
      "Max 10–100W",
      "Terminal: L, L1, COM, S1",
    ],
    image: "/products/SWL-001.png",
  },
  {
    id: "SWL-002",
    slug: "swl-002-switch-2ch-l-zigbee",
    code: "SWL-002",
    name: "Smart switch -2ch L ZIGBEE",
    nameUz: "Smart switch 2ch L Zigbee",
    category: "rele",
    price: 15,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "2 kanalli L-tip Zigbee moduli.",
    description:
      "2CH Zigbee Switch Module-L. Max load 2×(10–100W).",
    specs: [
      "2 kanal L",
      "Zigbee",
      "AC 100–240V 50/60Hz",
      "Max 2×(10–100W)",
      "Terminal: L2, L, L1, COM, S1, S2",
    ],
    image: "/products/SWL-002.png",
  },
  {
    id: "SWL-003",
    slug: "swl-003-switch-3ch-l-zigbee",
    code: "SWL-003",
    name: "Smart switch -3ch L ZIGBEE",
    nameUz: "Smart switch 3ch L Zigbee",
    category: "rele",
    price: 17,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "3 kanalli L-tip Zigbee moduli.",
    description:
      "3CH Zigbee Switch Module-L. Max load 3×(10–100W).",
    specs: [
      "3 kanal L",
      "Zigbee",
      "AC 100–240V 50/60Hz",
      "Max 3×(10–100W)",
      "Terminal: L, L1, L2, L3, COM, COM",
    ],
    image: "/products/SWL-003.png",
  },
  {
    id: "SWL-004",
    slug: "swl-004-switch-4ch-l-zigbee",
    code: "SWL-004",
    name: "Smart switch -4ch L ZIGBEE",
    nameUz: "Smart switch 4ch L Zigbee",
    category: "rele",
    price: 18,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "4 kanalli L-tip Zigbee moduli.",
    description:
      "4CH Zigbee Switch Module-L. Max load 4×(10–100W).",
    specs: [
      "4 kanal L",
      "Zigbee",
      "AC 100–240V 50/60Hz",
      "Max 4×(10–100W)",
      "Terminal: L, L1, L2, L3, L4, S",
    ],
    image: "/products/SWL-004.png",
  },
  {
    id: "TGW-60W",
    slug: "tgw-60w-smart-thermostat-wifi",
    code: "TGW-60W",
    name: "Smart thermostat WI-FI",
    nameUz: "Smart termostat Wi-Fi",
    category: "iqlim",
    price: 35,
    currency: "USD",
    protocol: "wifi",
    colors: ["white", "black"],
    shortDescription: "Wi-Fi smart termostat, sensorli displey.",
    description:
      "Devorga o‘rnatiladigan smart termostat. Haroratni ilova orqali nazorat qiling, isitish/sovutish ssenariylarini sozlang.",
    specs: ["Wi-Fi", "Sensorli displey", "Oq / Qora", "Devorga o‘rnatish"],
    image: "/products/TGW-60W.png",
    featured: true,
  },
  {
    id: "SMZ-001",
    slug: "smz-001-motor-voda-gaz-zigbee",
    code: "SMZ-001",
    name: "Smart motorchik vodi/gaza ZIGBEE",
    nameUz: "Smart motor (suv/gaz) Zigbee",
    category: "sensorlar",
    price: 24,
    currency: "USD",
    protocol: "zigbee",
    colors: ["black"],
    shortDescription: "Suv yoki gaz ventilini avtomatik yopish uchun motor.",
    description:
      "Sharli ventil ustiga o‘rnatiladigan smart aktuator. Suv toshishi yoki gaz sizishi holatida avtomatik yopadi. Adapter bilan.",
    specs: ["Zigbee", "Suv / gaz ventil", "Avtomatik yopish", "Adapter bilan"],
    image: "/products/SMZ-001.png",
    featured: true,
  },
  {
    id: "SDZ-001",
    slug: "sdz-001-sensor-dveri-zigbee",
    code: "SDZ-001",
    name: "Smart sensor dveri ZIGBEE",
    nameUz: "Eshik sensori Zigbee",
    category: "sensorlar",
    price: 13,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "Eshik/oyna uchun magnitli kontaktsensor.",
    description:
      "Ikki qismli magnitli eshik/oyna sensori. Ochilish haqida bildirishnoma — xavfsizlik tizimining asosi.",
    specs: ["Zigbee", "Eshik / oyna", "Magnitli kontakt", "Oq"],
    image: "/products/SDZ-001.png",
  },
  {
    id: "SDZ-002",
    slug: "sdz-002-datchik-vodi-zigbee",
    code: "SDZ-002",
    name: "Smart datchik vodi ZIGBEE",
    nameUz: "Suv sizish sensori Zigbee",
    category: "sensorlar",
    price: 14,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "Suv sizishini aniqlovchi dumaloq sensor.",
    description:
      "Polga qo‘yiladigan suv sizish sensori. Suv aniqlansa darhol ogohlantiradi — SMZ-001 motor bilan juftlash mumkin.",
    specs: ["Zigbee", "Suv sizish", "Dumaloq korpus", "Oq"],
    image: "/products/SDZ-002.png",
  },
  {
    id: "SDZ-003",
    slug: "sdz-003-datchik-dima-zigbee",
    code: "SDZ-003",
    name: "Smart datchik dima ZIGBEE",
    nameUz: "Tutun sensori Zigbee",
    category: "sensorlar",
    price: 22,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "Zigbee tutun (smoke) sensori.",
    description:
      "Yong‘in xavfini erta aniqlash uchun tutun sensori. LED indikatori bilan, shiftga o‘rnatiladi.",
    specs: ["Zigbee", "Tutun / smoke", "LED indikator", "Oq"],
    image: "/products/SDZ-003.png",
  },
  {
    id: "SDZ-004",
    slug: "sdz-004-zigbee-shlyuz",
    code: "SDZ-004",
    name: "ZIGBEE SHLYUZ",
    nameUz: "Zigbee shlyuz (gateway)",
    category: "shlyuzlar",
    price: 17,
    currency: "USD",
    protocol: "zigbee",
    colors: ["white"],
    shortDescription: "Zigbee qurilmalar uchun markaziy hub.",
    description:
      "Barcha Zigbee sensor, rele va motorlarni Wi-Fi/ilova orqali boshqarish uchun shlyuz. Smart uy tizimining yuragi.",
    specs: ["Zigbee hub", "Wi-Fi ulanish", "Ko‘p qurilma", "Oq"],
    image: "/products/SDZ-004.png",
    featured: true,
  },
  {
    id: "SKW-003",
    slug: "skw-003-karniz-3m-wifi",
    code: "SKW-003",
    name: "Smart karniz 3-metr WI-Fi",
    nameUz: "Smart karniz 3 m Wi-Fi",
    category: "karnizlar",
    price: 95,
    currency: "USD",
    protocol: "wifi",
    colors: ["white"],
    shortDescription: "3 metrli avtomatik karniz, Wi-Fi.",
    description:
      "Avtomatik karniz — ilova va ovoz orqali ochish/yopish. Tinich motor, taymer, 3 metrli parda uchun.",
    specs: ["3 metr", "Wi-Fi", "Tinich motor", "Taymer"],
    image: "/products/SKW-003.png",
  },
  {
    id: "SKW-004",
    slug: "skw-004-karniz-4m-wifi",
    code: "SKW-004",
    name: "Smart karniz 4-metr WI-Fi",
    nameUz: "Smart karniz 4 m Wi-Fi",
    category: "karnizlar",
    price: 105,
    currency: "USD",
    protocol: "wifi",
    colors: ["white"],
    shortDescription: "4 metrli avtomatik karniz, Wi-Fi.",
    description:
      "Avtomatik karniz 4 metr. Ilova va ovoz bilan boshqaruv, tinich motor, ochish/yopish taymeri.",
    specs: ["4 metr", "Wi-Fi", "Tinich motor", "Taymer"],
    image: "/products/SKW-004.png",
    featured: true,
  },
  {
    id: "SKW-005",
    slug: "skw-005-karniz-5m-wifi",
    code: "SKW-005",
    name: "Smart karniz 5-metr WI-Fi",
    nameUz: "Smart karniz 5 m Wi-Fi",
    category: "karnizlar",
    price: 110,
    currency: "USD",
    protocol: "wifi",
    colors: ["white"],
    shortDescription: "5 metrli avtomatik karniz, Wi-Fi.",
    description:
      "Keng derazalar uchun 5 metrli smart karniz. To‘liq smart uy integratsiyasi.",
    specs: ["5 metr", "Wi-Fi", "Tinich motor", "Taymer"],
    image: "/products/SKW-005.png",
  },
  {
    id: "SKW-006",
    slug: "skw-006-karniz-6m-wifi",
    code: "SKW-006",
    name: "Smart karniz 6-metr WI-Fi",
    nameUz: "Smart karniz 6 m Wi-Fi",
    category: "karnizlar",
    price: 120,
    currency: "USD",
    protocol: "wifi",
    colors: ["white"],
    shortDescription: "6 metrli avtomatik karniz, Wi-Fi.",
    description:
      "Eng uzun 6 metrli smart karniz — panoramali derazalar va zal uchun.",
    specs: ["6 metr", "Wi-Fi", "Tinich motor", "Taymer"],
    image: "/products/SKW-006.png",
  },
  {
    id: "WLP-001",
    slug: "wlp-001-lampochka-rgb-16w-wifi",
    code: "WLP-001",
    name: "Smart lampochka RGB 16W WI-Fi",
    nameUz: "Smart lampochka RGB 16W Wi-Fi",
    category: "yoritish",
    price: 6,
    currency: "USD",
    protocol: "wifi",
    colors: ["rgb"],
    shortDescription: "16W RGB smart lampochka, Wi-Fi.",
    description:
      "Rangli RGB smart lampochka. Millionlab ranglar, ssenariylar va masofadan boshqaruv — Wi-Fi orqali.",
    specs: ["16W", "RGB", "Wi-Fi", "Ilova orqali rang"],
    image: "/products/WLP-001.png",
  },
  {
    id: "WLP-002",
    slug: "wlp-002-ik-pult-wifi",
    code: "WLP-002",
    name: "Smart IK-pult WI-Fi",
    nameUz: "Smart IR pult Wi-Fi",
    category: "yoritish",
    price: 20,
    currency: "USD",
    protocol: "wifi",
    colors: ["black"],
    shortDescription: "Wi-Fi orqali IR qurilmalarni boshqarish.",
    description:
      "Konditsioner, TV va boshqa IR qurilmalarni telefongan smart IR pult. Yagona hub sifatida ishlaydi.",
    specs: ["Wi-Fi", "Infrared (IR)", "TV / konditsioner", "Qora"],
    image: "/products/WLP-002.png",
  },
  {
    id: "YSM-001",
    slug: "yandex-stansiya-midi",
    code: "YSM-001",
    name: "Yandex Stansiya Midi",
    nameUz: "Yandex Stansiya Midi",
    category: "kolonkalar",
    price: 170,
    currency: "USD",
    protocol: "yandex",
    colors: ["yellow", "black", "gray", "pink", "teal"],
    shortDescription:
      "Yandex Stansiya Midi — ovozli yordamchi Alice, soat va musiqa.",
    description:
      "Yandex Stansiya Midi smart kolonka. Alice ovozli yordamchi, LED soat, musiqa va smart uy bilan integratsiya. 5 xil rangda mavjud.",
    specs: [
      "Yandex Alice",
      "LED soat",
      "Wi-Fi",
      "5 rang",
      "Smart uy integratsiyasi",
    ],
    image: "/products/YSM-001.png",
    imagesByColor: {
      yellow: "/products/YSM-001-yellow.png",
      black: "/products/YSM-001-black.png",
      gray: "/products/YSM-001-gray.png",
      pink: "/products/YSM-001-pink.png",
      teal: "/products/YSM-001-teal.png",
    },
    featured: true,
  },
  {
    id: "YSL-001",
    slug: "yandex-stansiya-layt",
    code: "YSL-001",
    name: "Yandex Stansiya Layt",
    nameUz: "Yandex Layt (soatsiz)",
    category: "kolonkalar",
    price: 60,
    currency: "USD",
    protocol: "yandex",
    colors: ["pink", "green", "teal", "orange", "purple"],
    shortDescription:
      "Yandex Layt (soatsiz) — Alice bilan ixcham smart kolonka.",
    description:
      "Yandex Stansiya Layt (soatsiz) — Alice ovozli yordamchi bilan ixcham smart kolonka. Soatsiz model, musiqa va smart uy bilan ishlaydi. Pushti, yashil, moviy, to‘q sariq va binafsha ranglarda.",
    specs: [
      "Yandex Alice",
      "Soatsiz",
      "Wi-Fi",
      "Ixcham",
      "5 rang",
    ],
    image: "/products/YSL-001.png",
    imagesByColor: {
      pink: "/products/YSL-001-pink.png",
      green: "/products/YSL-001-green.png",
      teal: "/products/YSL-001-teal.png",
      orange: "/products/YSL-001-orange.png",
      purple: "/products/YSL-001-purple.png",
    },
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductByCode(code: string): Product | undefined {
  return products.find(
    (p) => p.code.toLowerCase() === code.toLowerCase() || p.id === code,
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  const rounded = Math.round((price + Number.EPSILON) * 100) / 100;
  if (Number.isInteger(rounded)) return `${rounded}$`;
  return `${rounded.toFixed(2)}$`;
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.nameUz.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.protocol.includes(q) ||
      p.specs.some((s) => s.toLowerCase().includes(q)),
  );
}
