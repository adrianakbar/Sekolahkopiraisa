import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/helper';

// Tipe untuk data item dalam keranjang
export interface CartItemData {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  selected: boolean;
}

// Props untuk komponen CartItem
interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onSelectionChange: (id: number, isSelected: boolean) => void;
}





// Komponen untuk satu item di keranjang
export default function CartItem({ item, onQuantityChange, onSelectionChange }: CartItemProps): JSX.Element {
  const handleIncrease = (): void => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrease = (): void => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onSelectionChange(item.id, e.target.checked);
  };

  const itemTotal: number = item.price * item.quantity;

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
      {/* Checkbox */}
      <div className="col-span-1 flex justify-center">
        <input
          type="checkbox"
          checked={item.selected}
          onChange={handleSelect}
          className="h-4 w-4 text-amber-700 border-gray-300 rounded focus:ring-amber-600"
        />
      </div>

      {/* Detail Produk */}
      <div className="col-span-5 flex items-center space-x-3">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md border border-gray-200"
          style={{ backgroundColor: item.imageUrl.includes('Durian') ? '#e9f5ee' : '#fef9e7' }} // Contoh BG berbeda
        />
        <div>
          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      </div>

      {/* Harga */}
      <div className="col-span-2 text-center text-sm text-gray-700">
        {formatCurrency(item.price)}
      </div>

      {/* Kuantitas */}
      <div className="col-span-2 flex justify-center">
        <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 text-gray-700 hover:bg-gray-200 focus:outline-none"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="w-8 text-center bg-white text-sm">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 text-gray-700 hover:bg-gray-200 focus:outline-none"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Harga */}
      <div className="col-span-2 text-right text-sm font-medium text-gray-900">
        {formatCurrency(itemTotal)}
      </div>
    </div>
  );
}
