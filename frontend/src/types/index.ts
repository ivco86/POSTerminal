export interface User {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  tenant_id: number;
}

export interface Tenant {
  id: number;
  name: string;
  subdomain: string | null;
  currency: string;
  is_active: boolean;
}

export interface Product {
  id: number;
  name: string;
  category_id: number | null;
  description: string | null;
  sku: string | null;
  barcode: string | null;
  price: number;
  vat_rate: number;
  stock_quantity: number;
  is_active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount: number;
}

export interface Sale {
  id: number;
  sale_number: string;
  subtotal: number;
  discount_amount: number;
  vat_amount: number;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
}
