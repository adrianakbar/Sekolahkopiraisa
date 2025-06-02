"use client";

import { useEffect, useState } from "react";
import CartItem, { CartItemData } from "../components/CartCard";
import { formatCurrency } from "../utils/helper";
import { fetchAllCart } from "../utils/cart";
import { useRouter } from "next/navigation";
import { useCartStore } from "../stores/cartStore";
import Popup from "../components/Popup";

// Define the structure of the API response for better type safety
interface ApiProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ApiCartItem {
  id: number;
  cart_id: number;
  products_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: ApiProduct;
}

// This is what fetchAllCart is expected to return (the 'data' part of the original API response)
interface FetchedCartData {
  message: string;
  data: {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    cartItems: ApiCartItem[];
  }[];
}

// Komponen utama Keranjang Belanja
export default function ShoppingCart(): JSX.Element {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState("");
    const [popupType, setPopupType] = useState<"success" | "error">("success");
     const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    useCartStore.getState().setCartItems(selectedItems);
    router.push("/checkout");
  };

  useEffect(() => {
    const popupData = sessionStorage.getItem("popup");
    if (popupData) {
      const { message, type } = JSON.parse(popupData);
      setMessage(message);
      setPopupType(type);
      setShowPopup(true);
      sessionStorage.removeItem("popup");
    }
  }, []);
  useEffect(() => {
    const loadCartData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call your imported function
        const result: FetchedCartData = await fetchAllCart();

        // 'result' is now the actual data returned by response.data in fetchAllCart
        // (e.g., { message: "...", data: [ ... ] })
        if (
          result &&
          result.data &&
          result.data.length > 0 &&
          result.data[0].cartItems
        ) {
          const fetchedApiCartItems = result.data[0].cartItems;
          const transformedItems: CartItemData[] = fetchedApiCartItems.map(
            (apiItem) => ({
              id: apiItem.id,
              imageUrl: apiItem.product.image,
              name: apiItem.product.name,
              description: apiItem.product.description,
              price: apiItem.product.price,
              quantity: apiItem.quantity,
              selected: true,
            })
          );
          setCartItems(transformedItems);
        } else {
          console.warn(
            "Cart data is empty or not in the expected format from fetchAllCart:",
            result
          );
          setCartItems([]);
        }
      } catch (err) {
        // Error is caught from fetchAllCart's re-throw
        let errorMessage = "Failed to load cart items.";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        // If using Axios, error object might have more details
        // e.g., (err as any).response?.data?.message
        const axiosError = err as any; // Type assertion for potential Axios error
        if (axiosError.isAxiosError && axiosError.response?.data?.message) {
          errorMessage = `API Error: ${axiosError.response.data.message} (status: ${axiosError.response.status})`;
        } else if (axiosError.isAxiosError && axiosError.message) {
          errorMessage = `Network Error: ${axiosError.message}`;
        }

        setError(errorMessage);
        console.error("Error loading cart data in component:", err); // Log the full error object for details
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, []); // Empty dependency array means this effect runs once on mount

  // ... (rest of your component: handleQuantityChange, handleSelectionChange, JSX)
  // useEffect for totalPrice remains the same
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return item.selected ? sum + item.price * item.quantity : sum;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Fungsi untuk mengubah kuantitas
  const handleQuantityChange = (id: number, newQuantity: number): void => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  // Fungsi untuk mengubah seleksi
  const handleSelectionChange = (id: number, isSelected: boolean): void => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, selected: isSelected } : item
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-4xl mx-auto my-4"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
        <p className="text-xs mt-1">
          Please check the console for more details or try again later.
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
        <h2 className="text-lg font-medium text-gray-800 mb-6">
          Keranjang Belanja
        </h2>
        <p className="text-gray-600">Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      {showPopup && (
              <Popup
                message={message}
                type={popupType}
                onClose={() => setShowPopup(false)}
              />
            )}
      <h2 className="text-lg font-medium text-gray-800 mb-6">
        Keranjang Belanja
      </h2>
      <div className="hidden md:grid md:grid-cols-12 md:gap-4 text-sm text-gray-500 font-medium mb-4 border-b pb-3">
        <div className="col-span-1"></div>
        <div className="col-span-5">Detail Produk</div>
        <div className="col-span-2 text-center">Harga</div>
        <div className="col-span-2 text-center">Jumlah</div>
        <div className="col-span-2 text-right">Total Harga</div>
      </div>
      <div className="divide-y divide-gray-100 md:divide-y-0">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 gap-4">
        <div className="text-sm font-medium text-gray-800">
          Total ({cartItems.filter((item) => item.selected).length} item
          {cartItems.filter((item) => item.selected).length !== 1
            ? "s"
            : ""}): {formatCurrency(totalPrice)}
        </div>
        <button
          type="submit"
          className="cursor-pointer w-30 bg-primary text-white py-2 px-3 text-sm font-medium rounded-xl hover:-translate-y-1 duration-150 ease-in flex justify-center items-center gap-2 disabled:opacity-50"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
