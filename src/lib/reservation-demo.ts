export type RoomCategory = "single" | "twin" | "triple";

export type RoomType = {
  id: string;
  category: RoomCategory;
  name: string;
  summary: string;
  size: string;
  capacity: string;
  maxGuests: number;
  priceFrom: number;
  status: "空室あり" | "残りわずか";
  badge: string;
  features: string[];
  meals: string;
  payment: string;
  priceNote: string;
  hasBreakfast: boolean;
  hasDinner: boolean;
  isNonSmoking: boolean;
  hasInternet: boolean;
};

export const roomTypes: RoomType[] = [
  {
    id: "single-a-smoking",
    category: "single",
    name: "【シングルA】 喫煙ルーム",
    summary: "朝食付きの定番シングル。出張利用にも使いやすい、落ち着いた客室です。",
    size: "15㎡",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 5930,
    status: "空室あり",
    badge: "朝食付",
    features: ["喫煙", "セミダブルベッド", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: false,
    hasInternet: true,
  },
  {
    id: "single-a-non-smoking",
    category: "single",
    name: "【シングルA】 禁煙ルーム",
    summary: "朝食付きの定番シングル。すっきりとお過ごしいただける禁煙タイプです。",
    size: "15㎡",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 5930,
    status: "空室あり",
    badge: "朝食付",
    features: ["禁煙", "セミダブルベッド", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: true,
    hasInternet: true,
  },
  {
    id: "single-b-smoking",
    category: "single",
    name: "【シングルB】 喫煙ルーム",
    summary: "ゆとりのあるシングルBタイプ。島原でのご滞在を静かに支える一室です。",
    size: "15㎡〜",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 6210,
    status: "空室あり",
    badge: "朝食付",
    features: ["喫煙", "朝食付き", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: false,
    hasInternet: true,
  },
  {
    id: "single-b-non-smoking",
    category: "single",
    name: "【シングルB】 禁煙ルーム",
    summary: "シングルBの禁煙タイプ。出張にも一人旅にも選びやすい客室です。",
    size: "15㎡〜",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 6210,
    status: "空室あり",
    badge: "朝食付",
    features: ["禁煙", "朝食付き", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: true,
    hasInternet: true,
  },
  {
    id: "single-c-smoking",
    category: "single",
    name: "【シングルC】 喫煙ルーム",
    summary: "少しゆとりのあるシングルCタイプ。長めのご滞在にも心地よい客室です。",
    size: "15㎡〜",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 6400,
    status: "残りわずか",
    badge: "朝食付",
    features: ["喫煙", "朝食付き", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: false,
    hasInternet: true,
  },
  {
    id: "single-c-non-smoking",
    category: "single",
    name: "【シングルC】 禁煙ルーム",
    summary: "シングルCの禁煙タイプ。落ち着いた空間で、ゆったりとお休みいただけます。",
    size: "15㎡〜",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 6400,
    status: "残りわずか",
    badge: "朝食付",
    features: ["禁煙", "朝食付き", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: true,
    hasInternet: true,
  },
  {
    id: "single-s-smoking",
    category: "single",
    name: "【シングルS】 喫煙ルーム",
    summary: "コンパクトながら使いやすい、シングルSタイプの朝食付きプランです。",
    size: "約13㎡",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 5360,
    status: "空室あり",
    badge: "朝食付",
    features: ["喫煙", "コンパクト", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: false,
    hasInternet: true,
  },
  {
    id: "single-s-non-smoking",
    category: "single",
    name: "【シングルS】 禁煙ルーム",
    summary: "約13平米のコンパクトシングル。Wi-Fiと有線LANに対応した禁煙タイプです。",
    size: "約13㎡",
    capacity: "1名様",
    maxGuests: 1,
    priceFrom: 5360,
    status: "空室あり",
    badge: "朝食付",
    features: ["禁煙", "Wi-Fi / 有線LAN", "コンパクト", "現地決済"],
    meals: "朝食あり / 夕食なし",
    payment: "現地決済",
    priceNote: "1名利用時 / 1泊あたり",
    hasBreakfast: true,
    hasDinner: false,
    isNonSmoking: true,
    hasInternet: true,
  },
  {
    id: "twin-a-smoking",
    category: "twin",
    name: "【ツインA】 喫煙ルーム",
    summary: "ご夫婦やご友人とのご滞在におすすめの、素泊まりツインプランです。",
    size: "27㎡〜",
    capacity: "2名様",
    maxGuests: 2,
    priceFrom: 10450,
    status: "空室あり",
    badge: "素泊まり",
    features: ["喫煙", "2名利用", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食なし / 夕食なし",
    payment: "現地決済",
    priceNote: "1室あたり / 1泊あたり",
    hasBreakfast: false,
    hasDinner: false,
    isNonSmoking: false,
    hasInternet: true,
  },
  {
    id: "twin-b-smoking",
    category: "twin",
    name: "【ツインB】 喫煙ルーム",
    summary: "よりゆとりのあるツインBタイプ。旅先でも落ち着いてお過ごしいただけます。",
    size: "27㎡〜",
    capacity: "2名様",
    maxGuests: 2,
    priceFrom: 12350,
    status: "残りわずか",
    badge: "素泊まり",
    features: ["喫煙", "広め", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食なし / 夕食なし",
    payment: "現地決済",
    priceNote: "1室あたり / 1泊あたり",
    hasBreakfast: false,
    hasDinner: false,
    isNonSmoking: false,
    hasInternet: true,
  },
  {
    id: "triple-smoking",
    category: "triple",
    name: "【トリプル】 喫煙ルーム",
    summary: "最上階角部屋のトリプルルーム。グループやご家族で広々とお過ごしいただけます。",
    size: "約36㎡",
    capacity: "3名様",
    maxGuests: 3,
    priceFrom: 15200,
    status: "残りわずか",
    badge: "素泊まり",
    features: ["喫煙", "最上階角部屋", "Wi-Fi / 有線LAN", "現地決済"],
    meals: "朝食なし / 夕食なし",
    payment: "現地決済",
    priceNote: "1室あたり / 1泊あたり",
    hasBreakfast: false,
    hasDinner: false,
    isNonSmoking: false,
    hasInternet: true,
  },
];

export type ReservationSearch = {
  checkin: string;
  checkout: string;
  guests: string;
  rooms: string;
  adults: string;
  childUpper: string;
  childLower: string;
  infantMealBed: string;
  infantMealOnly: string;
  infantBedOnly: string;
  infantNoMealBed: string;
  budgetMin: string;
  budgetMax: string;
  roomKinds: string;
  amenities: string;
};

export type SearchParamInput = Record<string, string | string[] | undefined>;

export function getDefaultSearch(): ReservationSearch {
  const today = new Date();
  const checkin = new Date(today);
  checkin.setDate(today.getDate() + 1);
  const checkout = new Date(checkin);
  checkout.setDate(checkin.getDate() + 1);

  return {
    checkin: toDateInputValue(checkin),
    checkout: toDateInputValue(checkout),
    guests: "2",
    rooms: "1",
    adults: "2",
    childUpper: "0",
    childLower: "0",
    infantMealBed: "0",
    infantMealOnly: "0",
    infantBedOnly: "0",
    infantNoMealBed: "0",
    budgetMin: "",
    budgetMax: "",
    roomKinds: "",
    amenities: "",
  };
}

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function readSingleParam(value: string | string[] | undefined) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] || "";
  return "";
}

function readListParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value.filter(Boolean).join(",");
  return typeof value === "string" ? value : "";
}

function toNumber(value: string) {
  const parsed = Number(value || "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizeSearch(input: Partial<ReservationSearch>): ReservationSearch {
  const defaults = getDefaultSearch();
  const adults = input.adults || input.guests || defaults.adults;

  return {
    checkin: input.checkin || defaults.checkin,
    checkout: input.checkout || defaults.checkout,
    guests: input.guests || adults,
    rooms: input.rooms || defaults.rooms,
    adults,
    childUpper: input.childUpper || defaults.childUpper,
    childLower: input.childLower || defaults.childLower,
    infantMealBed: input.infantMealBed || defaults.infantMealBed,
    infantMealOnly: input.infantMealOnly || defaults.infantMealOnly,
    infantBedOnly: input.infantBedOnly || defaults.infantBedOnly,
    infantNoMealBed: input.infantNoMealBed || defaults.infantNoMealBed,
    budgetMin: input.budgetMin || defaults.budgetMin,
    budgetMax: input.budgetMax || defaults.budgetMax,
    roomKinds: input.roomKinds || defaults.roomKinds,
    amenities: input.amenities || defaults.amenities,
  };
}

export function getSearchFromParams(searchParams: SearchParamInput) {
  return normalizeSearch({
    checkin: readSingleParam(searchParams.checkin),
    checkout: readSingleParam(searchParams.checkout),
    guests: readSingleParam(searchParams.guests),
    rooms: readSingleParam(searchParams.rooms),
    adults: readSingleParam(searchParams.adults),
    childUpper: readSingleParam(searchParams.childUpper),
    childLower: readSingleParam(searchParams.childLower),
    infantMealBed: readSingleParam(searchParams.infantMealBed),
    infantMealOnly: readSingleParam(searchParams.infantMealOnly),
    infantBedOnly: readSingleParam(searchParams.infantBedOnly),
    infantNoMealBed: readSingleParam(searchParams.infantNoMealBed),
    budgetMin: readSingleParam(searchParams.budgetMin),
    budgetMax: readSingleParam(searchParams.budgetMax),
    roomKinds: readListParam(searchParams.roomKinds),
    amenities: readListParam(searchParams.amenities),
  });
}

export function formatStayDate(value: string) {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  return `${year}/${month}/${day}`;
}

export function getNightCount(checkin: string, checkout: string) {
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const diff = checkoutDate.getTime() - checkinDate.getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));

  return Math.max(1, nights || 1);
}

export function formatCurrency(value: number) {
  return `¥${value.toLocaleString("ja-JP")}`;
}

export function getRoomById(id?: string | null) {
  return roomTypes.find((room) => room.id === id) ?? roomTypes[0];
}

export function getTotalGuests(search: ReservationSearch) {
  return (
    toNumber(search.adults) +
    toNumber(search.childUpper) +
    toNumber(search.childLower) +
    toNumber(search.infantMealBed) +
    toNumber(search.infantMealOnly) +
    toNumber(search.infantBedOnly) +
    toNumber(search.infantNoMealBed)
  );
}

export function getSelectedKinds(roomKinds: string) {
  return roomKinds
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean) as RoomCategory[];
}

export function getSelectedAmenities(amenities: string) {
  return amenities
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function getAvailableRooms(search: ReservationSearch) {
  const selectedKinds = getSelectedKinds(search.roomKinds);
  const selectedAmenities = getSelectedAmenities(search.amenities);
  const totalGuests = Math.max(1, getTotalGuests(search));
  const roomCount = Math.max(1, toNumber(search.rooms));
  const budgetMin = toNumber(search.budgetMin);
  const budgetMax = toNumber(search.budgetMax);

  const matched = roomTypes.filter((room) => {
    if (room.maxGuests * roomCount < totalGuests) return false;
    if (selectedKinds.length > 0 && !selectedKinds.includes(room.category)) return false;
    if (budgetMin > 0 && room.priceFrom < budgetMin) return false;
    if (budgetMax > 0 && room.priceFrom > budgetMax) return false;

    return selectedAmenities.every((amenity) => {
      if (amenity === "breakfast") return room.hasBreakfast;
      if (amenity === "dinner") return room.hasDinner;
      if (amenity === "non-smoking") return room.isNonSmoking;
      if (amenity === "internet") return room.hasInternet;
      return true;
    });
  });

  return matched.length > 0 ? matched : roomTypes;
}

export function buildReservationQuery(params: Record<string, string>) {
  return new URLSearchParams(params).toString();
}
