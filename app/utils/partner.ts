import api from "./api";

export const fetchAllPartner = async () => {
const response = await api.get("/api/v1/partner");
return response.data;
}
