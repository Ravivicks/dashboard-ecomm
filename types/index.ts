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
  type: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  productInformationTech: ProductInfoItem[] | [];
  productInformationAdditional: ProductInfoItem[] | [];
  highestPrice: number;
  quantity: number;
  minQuantity: number;
  lowestPrice: number;
  machineCode: string;
  averagePrice: number;
  discountRate: number;
  description: string;
  productDescription: string;
  category: string;
  subCategory: string;
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

export type UpdateProductProps = {
  "Item Category": string;
  "Item Description": string;
  "Item MLFB": string;
  "Item Rating": string;
  Count: number;
  "Sub Category": string;
  Category: string;
};
export type UpdateProductLocaleProps = {
  _id: string;
  currency: string;
  "description spanish": string;
  productDescriptionspanish: string;
  titlespanish: string;
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

export type IContact = {
  _id?: string;
  company: string;
  address: string;
  phone: string;
  workingHours: string;
  email: string;
};

export type IPartnerBannerFile = {
  imageId: any;
  _id: string;
  title: string;
  company: string;
  category: string;
  image: File; // Use File type to represent the uploaded file
};
export type IFeaturedCategory = {
  imageId: any;
  _id: string;
  category: string;
  image: File; // Use File type to represent the uploaded file
  categoryImage: File;
};

export type ISubscriber = {
  _id?: string;
  email: string;
  status: string;
};

export type CommonEnquireProps = {
  _id?: string;
  email: string;
  mobile: string;
  productName?: string;
  productId?: string;
  productPrice?: number;
  enquiryDescription: string;
  quantity?: number;
  status: "pending" | "approved" | "rejected";
  reason?: string;
  enquiryType: string;
  cartProduct?: {
    productName: string;
    productId: string;
    productPrice: number;
    quantity: number;
  }[];
  fullName?: string;
};

export type IAddress = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  city: string;
  state: string;
  phone: string;
  zipcode: string;
};

export interface PaymentDetails {
  method: string; // e.g., 'credit_card', 'paypal'
  status: string; // e.g., 'pending', 'completed', 'failed'
  transactionId: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CheckoutData {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentDetails: PaymentDetails;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  status: string;
  orderId: string;
  createdAt?: string;
}

export type IReply = {
  _id?: string;
  userId: string;
  comment: string;
  firstName?: string;
  lastName?: string;
};

export interface ILike {
  _id: string;
  userId: string;
  isLike: boolean;
  isUnlike: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IComment = {
  _id?: string;
  productId: string; // Reference to the product being reviewed
  userId: string;
  comment: string;
  rating: number;
  status: string;
  firstName?: string;
  lastName?: string;
  userAvatar?: string;
  replies?: IReply[];
  createdAt?: string;
  likes?: ILike[]; // Array of like actions
  unlikes?: ILike[]; // Array of unlike actions
};
