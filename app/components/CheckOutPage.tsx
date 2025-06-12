"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "../stores/cartStore";
import { createOrder } from "../utils/order";
import Popup from "./Popup";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../utils/helper";
import { getUser } from "../utils/user";
import { UserItem } from "../types/userType";
import { CreateOrderPayload } from "../types/orderType";

// ==================== TIPE ====================
interface OrderInformationProps {
  address: string;
  setAddress: (val: string) => void;
  userName: string;
  phoneNumber: number;
  errors?: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

interface ProductData {
  imageSrc: string;
  name: string;
  partnerName: string;
  price: number;
  quantity: number;
}

interface ProductItemProps extends ProductData {
  customNote: string;
  onNoteChange: (val: string) => void;
}

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
  errors = {},
  setErrors,
}) => {
  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: "" }));
    }
  };

  return (
    <div className="mb-6 p-4 border-b">
      <div className="mb-2">
        <p className="text-sm text-gray-500">Alamat Pengiriman</p>
        <textarea
          className={`w-full mt-1 p-2 border rounded-md text-sm ${
            errors.address ? "border-red-500" : ""
          }`}
          value={address}
          onChange={handleAddressChange}
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
};

const ProductItem: React.FC<ProductItemProps> = ({
  imageSrc,
  name,
  partnerName,
  price,
  quantity,
  customNote,
  onNoteChange,
}) => (
  <div className="grid grid-cols-12 gap-4 items-center mb-4 p-4 border rounded-lg shadow-sm">
    <div className="col-span-6 flex items-center">
      <img
        src={imageSrc}
        alt={name}
        className="w-20 h-20 object-cover rounded-md mr-4"
      />
      <div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-xs text-gray-500">Mitra: {partnerName}</p>
        <p className="text-sm font-medium text-primary mt-1">x {quantity}</p>
        <input
          type="text"
          className="py-1 px-2 text-sm mt-2 border rounded"
          placeholder="Catatan"
          value={customNote}
          onChange={(e) => onNoteChange(e.target.value)}
        />
      </div>
    </div>
    <div className="col-span-3 text-right">
      <p className="text-sm text-gray-700">{formatCurrency(price)}</p>
    </div>
    <div className="col-span-3 text-right">
      <p className="text-sm font-semibold text-gray-800">
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

  const [user, setUser] = useState<UserItem>({});

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");
  const [customNotes, setCustomNotes] = useState<Record<number, string>>({});

  const router = useRouter();
  const totalHarga = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleNoteChange = (productId: number, note: string) => {
    setCustomNotes((prev) => ({ ...prev, [productId]: note }));
  };

  const handleCreateOrder = async () => {
    const cartItems = useCartStore.getState().cartItems;
    if (cartItems.length === 0) {
      setMessage("Keranjang kosong. Silakan tambahkan produk.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    const orderPayload: CreateOrderPayload = {
      items: cartItems.map((item) => ({
        products_id: item.id,
        quantity: item.quantity,
        custom_note: customNotes[item.id] || "",
        fromCart: item.fromCart || false,
      })),
      address,
      paymentMethod: paymentMethod as CreateOrderPayload["paymentMethod"], // optional: safe typecast
    };

    try {
      const data = await createOrder(orderPayload);
      const redirectUrl = data.order?.payment?.snapRedirectUrl;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        setMessage(message);
        setPopupType("success");
        setShowPopup(true);
      }
    } catch (error: any) {
      if (error.type === "validation") {
        setErrors(error.errors);
      } else {
        console.error("Error:", error);
        setMessage(error.message || "Terjadi kesalahan saat membuat pesanan.");
        setPopupType("error");
        setShowPopup(true);
      }
    }
  };

  // Ambil data user saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
        setAddress(userData.address || ""); // Set alamat jika ada
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
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
        userName={user.name || ""}
        phoneNumber={user.phone_number || 0}
        errors={errors}
        setErrors={setErrors}
      />
      {/* Daftar Produk */}
      <div className="p-4">
        <div className="grid grid-cols-12 gap-4 mb-3 px-4">
          <div className="col-span-6">
            <h2 className="font-semibold text-gray-700">Detail Produk</h2>
          </div>
          <div className="col-span-3 text-sm text-gray-500 text-right">
            Harga Satuan
          </div>
          <div className="col-span-3 text-sm text-gray-500 text-right">
            Subtotal Produk
          </div>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada produk di keranjang.
          </p>
        ) : (
          cartItems.map((product, index) => (
            <ProductItem
              key={product.id}
              imageSrc={product.imageUrl}
              name={product.name}
              partnerName={product.partnerName ?? ""}
              price={product.price}
              quantity={product.quantity}
              customNote={customNotes[product.id] || ""}
              onNoteChange={(val) => handleNoteChange(product.id, val)}
            />
          ))
        )}
        <div className="text-right mt-4 pr-4">
          <p className="text-sm text-gray-500">Total Pesanan</p>
          <p className="text-lg font-medium text-primary">
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
            className="cursor-pointer w-40 bg-primary text-white py-2 px-3 text-sm font-medium rounded-xl hover:-translate-y-1 duration-150 ease-in flex justify-center items-center gap-2 disabled:opacity-50"
          >
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
