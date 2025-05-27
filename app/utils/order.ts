import api from "./api";

export const fetchAllOrder = async () => {
    const response = await api.get("/api/v1/order");
    return response.data;
};

export const fetchOrderById = async (id: number) => {
    const response = await api.get(`/api/v1/order/${id}/detail`);
    return response.data;
};

export const createPartner = async (data: {
    name: string;
    owner_name: string;
    phone_number: string;
    address: string;
}) => {
    try {
        const response = await api.post("/api/v1/partner/", data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const { data } = error.response;

            if (data.errors && typeof data.errors === "object") {
                throw {
                    type: "validation",
                    message: data.message || "Validasi gagal!",
                    errors: data.errors,
                };
            }

            if (data.errors && typeof data.errors === "string") {
                throw {
                    type: "general",
                    message: data.errors,
                };
            }

            throw {
                type: "general",
                message: data.message || "Terjadi kesalahan!",
            };
        }

        throw {
            type: "network",
            message: "Tidak dapat terhubung ke server. Coba lagi nanti.",
        };
    }
};

export const updatePartner = async (
    id: number,
    data: {
        name: string;
        owner_name: string;
        phone_number: string;
        address: string;
    }
) => {
    try {
        const response = await api.put(`/api/v1/partner/${id}`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const { data } = error.response;

            if (data.errors && typeof data.errors === "object") {
                throw {
                    type: "validation",
                    message: data.message || "Validasi gagal!",
                    errors: data.errors,
                };
            }

            if (data.errors && typeof data.errors === "string") {
                throw {
                    type: "general",
                    message: data.errors,
                };
            }

            throw {
                type: "general",
                message: data.message || "Terjadi kesalahan!",
            };
        }
        throw {
            type: "network",
            message: "Tidak dapat terhubung ke server. Coba lagi nanti.",
        };
    }
};

export const deletePartner = async (id: number) => {
    const response = await api.delete(`/api/v1/partner/${id}`);
    return response.data;
};
