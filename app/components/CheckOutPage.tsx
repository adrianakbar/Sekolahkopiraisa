"use client";

import React, { useState } from "react";
import { useCartStore } from "../stores/cartStore";
import { createOrder } from "../utils/order";
import Popup from "./Popup";
import { useRouter } from "next/navigation";

// ==================== TIPE ====================
interface OrderInformationProps {
  address: string;
  setAddress: (val: string) => void;
  userName: string;
  phoneNumber: string;
  errors?: Record<string, string>;
}

interface ProductData {
  imageSrc: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ProductItemProps extends ProductData {}
interface PaymentMethodsProps {
  selected: string;
  setSelected: (val: string) => void;
}

// ==================== KOMPONEN ====================

const OrderInformation: React.FC<OrderInformationProps> = ({
  address,
  setAddress,
  userName,
  phoneNumber,
  errors = {}, // default supaya tidak error jika tidak diberikan
}) => (
  <div className="mb-6 p-4 border-b">
    <div className="mb-2">
      <p className="text-sm text-gray-500">Alamat Pengiriman</p>
      <textarea
        className={`w-full mt-1 p-2 border rounded-md text-sm ${
          errors.address ? "border-red-500" : ""
        }`}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={3}
        placeholder="Masukkan alamat pengiriman"
      />
      {errors.address && (
        <p className="text-sm text-red-600 mt-1">{errors.address}</p>
      )}
    </div>
    <p className="text-sm text-gray-700 mt-1">{userName}</p>
    <p className="text-sm text-gray-700">{phoneNumber}</p>
  </div>
);

const ProductItem: React.FC<ProductItemProps> = ({
  imageSrc,
  name,
  description,
  price,
  quantity,
}) => (
  <div className="flex items-center mb-4 p-4 border rounded-lg shadow-sm">
    <img
      src={imageSrc}
      alt={name}
      className="w-20 h-20 object-cover rounded-md mr-4"
    />
    <div className="flex-grow">
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <p className="text-xs text-gray-500">{description}</p>
      <p className="text-sm font-semibold text-orange-500 mt-1">
        Rp {price.toLocaleString("id-ID")}
      </p>
    </div>
    <div className="text-right ml-4">
      <p className="text-sm text-gray-700">{quantity}</p>
      <p className="text-sm font-semibold text-gray-800 mt-1">
        Rp {(price * quantity).toLocaleString("id-ID")}
      </p>
    </div>
  </div>
);

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selected,
  setSelected,
}) => {
  const options = ["COD", "QRIS", "BANK_TRANSFER"];

  return (
    <div className="p-4 border-b">
      <h2 className="font-semibold mb-3 text-gray-700">Metode Pembayaran</h2>
      <div className="flex space-x-2">
        {options.map((method) => (
          <button
            key={method}
            onClick={() => setSelected(method)}
            className={`px-4 py-2 border rounded-md text-sm font-medium ${
              selected === method
                ? "bg-orange-100 text-orange-600 border-orange-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
};

// ==================== KOMPONEN UTAMA ====================

export default function CheckOutPage() {
  const cartItems = useCartStore((state) => state.cartItems);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");

  const router = useRouter();
  const totalHarga = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCreateOrder = async () => {
    const cartItems = useCartStore.getState().cartItems;
  
    const orderPayload = {
      items: cartItems.map((item) => ({
        products_id: item.id,
        quantity: item.quantity,
        custom_note: item.customNote || "",
        fromCart: item.fromCart || false,
      })),
      address,
      paymentMethod,
    };
  
    try {
      const data = await createOrder(orderPayload);
  
      // Ambil link snapRedirectUrl
      const redirectUrl = data.order?.payment?.snapRedirectUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect ke halaman pembayaran Midtrans
      } else {
        // Jika tidak ada redirect URL, tampilkan pesan sukses biasa
        setMessage("Pesanan berhasil dibuat!");
        setPopupType("success");
        setShowPopup(true);
      }
    } catch (error: any) {
      if (error.type === "validation") {
        setErrors(error.errors);
      } else {
        console.error("Error:", error);
        setMessage(
          error.message || "Terjadi kesalahan saat membuat pesanan."
        );
        setPopupType("error");
        setShowPopup(true);
      }
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      {/* Informasi Pengiriman */}
      <OrderInformation
        address={address}
        setAddress={setAddress}
        userName="Aulia Putri"
        phoneNumber="(+62) 8123456789"
        errors={errors}
      />

      {/* Daftar Produk */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-700">Detail Produk</h2>
          <div className="flex space-x-8 text-sm text-gray-500">
            <span>Harga</span>
            <span>Total Harga</span>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada produk di keranjang.
          </p>
        ) : (
          cartItems.map((product, index) => (
            <ProductItem
              key={index}
              imageSrc={product.imageUrl}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
            />
          ))
        )}
        <div className="text-right mt-4 pr-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-orange-500">
            Rp {totalHarga.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Pilih Pembayaran */}
      <PaymentMethods selected={paymentMethod} setSelected={setPaymentMethod} />

      {/* Total & Tombol Submit */}
      <div className="p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Pembayaran:</p>
            <p className="text-xl font-bold text-orange-500">
              Rp {totalHarga.toLocaleString("id-ID")}
            </p>
          </div>
          <button
            onClick={handleCreateOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow"
          >
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
