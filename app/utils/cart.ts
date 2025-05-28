import api from "./api";

/**
 * Mengambil semua data item dari keranjang belanja pengguna.
 * @returns {Promise<any>} Data keranjang dari API.
 */
export const fetchAllCart = async () => {
  try {
    const response = await api.get("/api/v1/cart");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data keranjang:", error);
    throw error;
  }
};

/**
 * Menambahkan produk ke keranjang.
 * Fungsi ini secara otomatis akan memeriksa apakah produk sudah ada.
 * Jika sudah ada, kuantitasnya akan ditambah. Jika belum, item baru akan dibuat.
 * @param {number} productId - ID dari produk yang akan ditambahkan.
 * @param {number} quantity - Jumlah yang akan ditambahkan.
 * @returns {Promise<any>} Respons dari API setelah operasi berhasil.
 */
export const addToCart = async (productId: number, quantity: number = 1) => {
  if (quantity <= 0) {
    throw new Error("Kuantitas harus lebih besar dari 0");
  }

  try {
    // 1. Ambil data keranjang saat ini
    const cartData = await fetchAllCart();
    // Menggunakan optional chaining untuk keamanan
    const cartItems = cartData?.data?.[0]?.cartItems || [];

    // 2. Cek apakah produk sudah ada
    const existingItem = cartItems.find((item: any) => item.product.id === productId);

    if (existingItem) {
      // 3a. Jika ada, update kuantitasnya
      const newQuantity = existingItem.quantity + quantity;
      // Endpoint yang lebih spesifik untuk update item biasanya lebih baik
      const response = await api.put(`/api/v1/cart/${existingItem.id}`, { 
        quantity: newQuantity 
      });
      return response.data;
    } else {
      // 3b. Jika tidak ada, buat item baru
      const response = await api.post('/api/v1/cart', {
        productId: productId,
        quantity: quantity,
      });
      return response.data;
    }
  } catch (error) {
    console.error("Gagal menambahkan ke keranjang:", error);
    throw error;
  }
};

/**
 * Menghapus satu item dari keranjang belanja.
 * @param {number} cartItemId - ID dari item keranjang (BUKAN ID produk) yang akan dihapus.
 * @returns {Promise<any>} Respons dari API.
 */
export const removeFromCart = async (cartItemId: number) => {
    try {
        const response = await api.delete(`/api/v1/cart/items/${cartItemId}`);
        return response.data;
    } catch (error) {
        console.error(`Gagal menghapus item ${cartItemId} dari keranjang:`, error);
        throw error;
    }
}

/**
 * Memperbarui kuantitas satu item di keranjang secara langsung.
 * @param {number} cartItemId - ID dari item keranjang yang akan diupdate.
 * @param {number} quantity - Kuantitas baru.
 * @returns {Promise<any>} Respons dari API.
 */
export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity <= 0) {
        // Jika kuantitas 0 atau kurang, hapus item tersebut
        return removeFromCart(cartItemId);
    }
    try {
        const response = await api.put(`/api/v1/cart/items/${cartItemId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error(`Gagal memperbarui kuantitas item ${cartItemId}:`, error);
        throw error;
    }
}