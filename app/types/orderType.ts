export interface OrderItem {
  products_id: number;
  quantity: number;
  custom_note: string;
  fromCart: boolean;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  address: string;
  paymentMethod: "COD" | "QRIS" | "BANK_TRANSFER";
}