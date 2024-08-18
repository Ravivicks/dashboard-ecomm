export type PriceHistoryItem = {
  price: number;
};
export type ProductInfoItem = {
  name: string;
  value: string;
};

export type User = {
  email: string;
};

export type IProduct = {
  _id: string;
  url: string;
  currency: string;
  image: string;
  pdfFile: string;
  title: string;
  discount: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  productInformationTech: ProductInfoItem[] | [];
  productInformationAdditional: ProductInfoItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  productDescription: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: Boolean;
  users?: User[];
  sliderImages?: string[] | [];
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};

export type ProductProps = {
  References: string;
  "Image Link-": string;
  "360 Image Link": string | 0;
  "Short Description": string;
  "Medium description": string;
  "Long Description": string;
  "Product Line Helios Code": string;
  "Product Line Name": string;
  Brand: string;
  EAN13: string;
  GTIN: string;
  keywords: string | 0;
  LP: number;
  PDP: string;
};

export type EnquireProps = {
  _id: string;
  email: string;
  mobile: string;
  productName: string;
  productId: string;
  productPrice: number;
  enquiryDescription: string;
  quantity: number;
  status: string;
  reason: string;
};

export type IPartnerBanner = {
  image: string;
  brand: string;
};
