"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "uz" | "ru";

type Dict = Record<string, string>;

const uz: Dict = {
  nav_home: "Bosh sahifa",
  nav_catalog: "Katalog",
  nav_company: "Kompaniya",
  nav_delivery: "Yetkazish",
  nav_contact: "Aloqa",
  nav_orders: "Buyurtmalarim",
  nav_wishlist: "Sevimlilar",
  nav_cart: "Savat",
  hero_eyebrow: "smart.house777",
  hero_title_1: "Aqlli uy",
  hero_title_2: "shu yerdan boshlanadi",
  hero_sub: "Zigbee, Wi-Fi va smart kolonkalar — professional katalog.",
  hero_cta: "Katalogni ochish",
  search_placeholder: "Mahsulot yoki kod qidiring…",
  categories: "Kategoriyalar",
  all: "Barchasi",
  our_products: "Bizning mahsulotlar",
  products_sub: "{n} ta qurilma — tanlang va buyurtma bering.",
  more: "Ko‘proq →",
  cta_title: "Toshkent bo‘ylab yetkazish bepul",
  cta_sub: "Nasiya, o‘rnatish xizmati va tez buyurtma — barchasi bir joyda.",
  cta_btn: "Xaridni boshlash",
  catalog_title: "Bizning mahsulotlar",
  catalog_sub: "Qurilma yoki kod bo‘yicha qidiring — masalan VKL-001.",
  search_short: "Qidiruv…",
  protocol_all: "Protokol: hammasi",
  sort: "Saralash",
  sort_asc: "Narx ↑",
  sort_desc: "Narx ↓",
  products_count: "{n} mahsulot",
  nothing_found: "Hech narsa topilmadi. Filtrni o‘zgartirib ko‘ring.",
  pages: "Sahifalar",
  contact: "Aloqa",
  company: "Kompaniya",
  delivery: "Yetkazib berish",
  faq: "FAQ",
  consult: "Konsultatsiya",
  footer_tag:
    "Smart uy, Zigbee va Wi-Fi qurilmalari — professional katalog. Toshkent bo‘ylab yetkazib berish bepul.",
  add_cart: "Savatga qo‘shish",
  added: "Qo‘shildi ✓",
  color: "Rang",
  qty: "Miqdor",
  specs: "Texnik xususiyatlar",
  related: "O‘xshash mahsulotlar",
  cart_title: "Sizning savatingiz",
  cart_empty: "Hali hech narsa qo‘shilmagan.",
  go_catalog: "Katalogga o‘tish",
  total: "Jami",
  products_label: "Mahsulotlar",
  delivery_label: "Yetkazib berish",
  checkout: "Buyurtmani rasmiylashtirish",
  lang_uz: "O‘z",
  lang_ru: "Рус",
  cat_viklyuchatellar: "Sensorli viklyuchatellar",
  cat_rele: "Zigbee rele / modullar",
  cat_sensorlar: "Sensorlar va xavfsizlik",
  cat_shlyuzlar: "Zigbee shlyuzlar",
  cat_karnizlar: "Smart karnizlar",
  cat_iqlim: "Termostatlar",
  cat_yoritish: "Yoritish va boshqaruv",
  cat_kolonkalar: "Smart kolonkalar",
};

const ru: Dict = {
  nav_home: "Главная",
  nav_catalog: "Каталог",
  nav_company: "Компания",
  nav_delivery: "Доставка",
  nav_contact: "Контакты",
  nav_orders: "Мои заказы",
  nav_wishlist: "Избранное",
  nav_cart: "Корзина",
  hero_eyebrow: "smart.house777",
  hero_title_1: "Умный дом",
  hero_title_2: "начинается здесь",
  hero_sub: "Zigbee, Wi-Fi и умные колонки — профессиональный каталог.",
  hero_cta: "Открыть каталог",
  search_placeholder: "Найти товар или код…",
  categories: "Категории",
  all: "Все",
  our_products: "Наши товары",
  products_sub: "{n} устройств — выбирайте и заказывайте.",
  more: "Ещё →",
  cta_title: "Доставка по Ташкенту бесплатно",
  cta_sub: "Рассрочка, установка и быстрый заказ — всё в одном месте.",
  cta_btn: "Начать покупки",
  catalog_title: "Наши товары",
  catalog_sub: "Ищите по названию или коду — например VKL-001.",
  search_short: "Поиск…",
  protocol_all: "Протокол: все",
  sort: "Сортировка",
  sort_asc: "Цена ↑",
  sort_desc: "Цена ↓",
  products_count: "{n} товаров",
  nothing_found: "Ничего не найдено. Измените фильтр.",
  pages: "Страницы",
  contact: "Контакты",
  company: "О компании",
  delivery: "Доставка",
  faq: "FAQ",
  consult: "Консультация",
  footer_tag:
    "Умный дом, Zigbee и Wi-Fi устройства — профессиональный каталог. Доставка по Ташкенту бесплатно.",
  add_cart: "В корзину",
  added: "Добавлено ✓",
  color: "Цвет",
  qty: "Количество",
  specs: "Характеристики",
  related: "Похожие товары",
  cart_title: "Ваша корзина",
  cart_empty: "Пока ничего не добавлено.",
  go_catalog: "В каталог",
  total: "Итого",
  products_label: "Товары",
  delivery_label: "Доставка",
  checkout: "Оформить заказ",
  lang_uz: "O‘z",
  lang_ru: "Рус",
  cat_viklyuchatellar: "Сенсорные выключатели",
  cat_rele: "Zigbee реле / модули",
  cat_sensorlar: "Датчики и безопасность",
  cat_shlyuzlar: "Zigbee шлюзы",
  cat_karnizlar: "Умные карнизы",
  cat_iqlim: "Термостаты",
  cat_yoritish: "Освещение и управление",
  cat_kolonkalar: "Умные колонки",
};

const DICTS: Record<Lang, Dict> = { uz, ru };

const LANG_KEY = "sh777_lang";

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  categoryName: (id: string, fallback: string) => string;
  productName: (nameUz: string, name: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved === "uz" || saved === "ru") setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let s = DICTS[lang][key] ?? DICTS.uz[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replace(`{${k}}`, String(v));
        }
      }
      return s;
    },
    [lang],
  );

  const categoryName = useCallback(
    (id: string, fallback: string) => t(`cat_${id}`) || fallback,
    [t],
  );

  const productName = useCallback(
    (nameUz: string, name: string) => (lang === "ru" ? name : nameUz),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, t, categoryName, productName }),
    [lang, setLang, t, categoryName, productName],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
