// Pastikan Anda memiliki file .d.ts untuk gambar jika Anda mengimpornya langsung
// contoh: images.d.ts
// declare module '*.jpg';
// declare module '*.png';
// declare module '*.jpeg';
// declare module '*.gif';

import React from "react";

// Tipe untuk props OrderInformation
interface OrderInformationProps {
  orderNumber: string;
  transactionDate: string;
  shippingAddress: string;
  phoneNumber: string;
  userName: string; // Menambahkan userName untuk "Aulia Putri"
}

// Komponen untuk menampilkan informasi pesanan
const OrderInformation: React.FC<OrderInformationProps> = ({
  orderNumber,
  transactionDate,
  shippingAddress,
  phoneNumber,
  userName,
}) => (
  <div className="mb-6 p-4 border-b">
    <div className="mb-2">
      <p className="text-sm text-gray-500">No. Pesanan</p>
      <p className="font-semibold">{orderNumber}</p>
    </div>
    <div className="mb-2">
      <p className="text-sm text-gray-500">Tanggal Transaksi</p>
      <p className="font-semibold">{transactionDate}</p>
    </div>
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Alamat Pengiriman</p>
        <button className="text-sm text-orange-500 hover:text-orange-600">
          ubah
        </button>
      </div>
      <p className="font-semibold">{userName}</p>
      <p className="text-sm text-gray-700">{phoneNumber}</p>
      <p className="text-sm text-gray-700">{shippingAddress}</p>
    </div>
  </div>
);

// Tipe untuk data produk
interface ProductData {
  imageSrc: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

// Tipe untuk props ProductItem
interface ProductItemProps extends ProductData {}

// Komponen untuk setiap item produk
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
      <p className="text-sm text-gray-700"> {quantity}</p>
      <p className="text-sm font-semibold text-gray-800 mt-1">
        Rp {(price * quantity).toLocaleString("id-ID")}
      </p>
    </div>
  </div>
);

// Komponen untuk metode pembayaran
const PaymentMethods: React.FC = () => {
  const paymentOptions: string[] = ["COD", "QRIS", "Transfer Bank"];
  // Anda bisa menambahkan state untuk melacak metode pembayaran yang dipilih
  // const [selectedMethod, setSelectedMethod] = React.useState<string>('Transfer Bank');

  return (
    <div className="p-4 border-b">
      <h2 className="font-semibold mb-3 text-gray-700">Metode Pembayaran</h2>
      <div className="flex space-x-2">
        {paymentOptions.map((method, index) => (
          <button
            key={method}
            // onClick={() => setSelectedMethod(method)}
            className={`px-4 py-2 border rounded-md text-sm font-medium
              ${
                index === 2
                  ? "bg-orange-100 text-orange-600 border-orange-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
              {/* Ganti logika 'index === 2' dengan 'selectedMethod === method' jika menggunakan state */}
            `}
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
};

// Komponen utama aplikasi
export default function CheckOutPage() {
  const products: ProductData[] = [
    {
      imageSrc:
        "https://via.placeholder.com/150/FFD700/000000?Text=El%27s+Coffee+Lampung", // Ganti dengan URL gambar produk asli
      name: "EL'S COFFEE Lampung Robusta",
      description: "500Gr Pure Indonesia Coffee Roasted Kopi AI749",
      price: 57000,
      quantity: 1,
    },
    {
      imageSrc:
        "https://via.placeholder.com/150/32CD32/FFFFFF?Text=El%27s+Coffee+Aceh", // Ganti dengan URL gambar produk asli
      name: "El's Coffee Kopi Aceh Gayo",
      description: "Arabika 250Gr Pure Indonesia Coffee Beans KopiArabika",
      price: 57000,
      quantity: 1,
    },
  ];

  const totalHarga: number = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Bagian Informasi Pesanan */}
      <OrderInformation
        orderNumber="12345678901234567890"
        transactionDate="12 - 092025"
        userName="Aulia Putri"
        shippingAddress="Br Purwakertha, Jalan Leko No. 13, Gerih, Abiansemal, KAB. BADUNG - ABIANSEMAL, BALI, ID 80352"
        phoneNumber="(+62) 8123456789"
      />

      {/* Bagian Detail Produk */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-700">Detail Produk</h2>
          <div className="flex space-x-8 text-sm text-gray-500">
            <span>Harga</span>
            <span>Total Harga</span>
          </div>
        </div>
        {products.map((product, index) => (
          <ProductItem
            key={index} // Untuk key, lebih baik menggunakan ID unik produk jika ada
            imageSrc={product.imageSrc}
            name={product.name}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
        <div className="text-right mt-4 pr-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-orange-500">
            Rp {totalHarga.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Bagian Metode Pembayaran */}
      <PaymentMethods />

      {/* Bagian Total Pembayaran dan Tombol Pesan */}
      <div className="p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Pembayaran:</p>
            <p className="text-xl font-bold text-orange-500">
              Rp {totalHarga.toLocaleString("id-ID")}
            </p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow">
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
