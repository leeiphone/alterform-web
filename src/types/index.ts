export type AxisKey = 'STRUCTURE' | 'DISTORTION' | 'FLUID' | 'GROWTH' | 'VOID';

export interface AxisInfo {
  key: AxisKey;
  id: string;
  nameKr: string;
  concept: string;
  keywords: string[];
  description: string;
  image: string;
  heroQuote: string;
  material: string;
}

export interface Product {
  id: string;
  axis: AxisKey;
  code: string; // e.g. "AF-R01"
  name: string;
  nameKr: string;
  price: number;
  description: string;
  image: string;
  details: {
    material: string;
    process: string;
    finish: string;
    leadTime: string;
    weight: string;
  };
  availableSizes: number[]; // e.g. [9, 11, 13, 15, 17, 19, 21, 23, 25]
  materials: {
    name: string;
    code: string;
    colorHex: string;
  }[];
  isSignature?: boolean;
  modelUrl?: string;
}

export interface CartItem {
  product: Product;
  size: number;
  selectedMaterial: string;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
  notes?: string;
  paymentMethod: 'card' | 'kakaopay' | 'naverpay' | 'transfer';
  items: CartItem[];
  totalAmount: number;
  date: string;
}
