"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { fetchAllPartner, deletePartner } from "@/app/utils/partner";
import PartnerTable, { PartnerListProps } from "@/app/components/PartnerTable";
import Popup from "@/app/components/Popup";
import ConfirmModal from "@/app/components/ConfirmModal";

export default function Partner() {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [popupType, setPopupType] = useState<"success" | "error">("success");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [data, setData] = useState<PartnerListProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);

    const handleAddPartner = () => {
        router.push("/admin/partner/create");
    };

    const hendleDeletePartner = async (id: number) => {
        try {
            const response = await deletePartner(id);
            if (response) {
                setData((prev) => prev.filter((a) => a.id !== id));
                setMessage(response.message);
                setPopupType("success");
                setShowPopup(true);
            }
        } catch (error: any) {
            setMessage(error.message || "Terjadi kesalahan saat menghapus.");
            setPopupType("error");
            setShowPopup(true);
        }
    };

    const handleEditPartner = (id: number) => {
        router.push(`/admin/partner/edit/${id}`);
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
        const getPartner = async () => {
            try {
                const response = await fetchAllPartner();
                const rawData = response.data;
                const formattedData = rawData.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    owner_name: item.owner_name,
                    phone_number: item.phone_number,
                    address: item.address,
                    products: item.products
                        .map((product: any) => product.name)
                        .join(", "),
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching partner data:", error);
                setError("Failed to fetch partner data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        setLoading(true);
        getPartner();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            {showPopup && (
                <Popup
                    message={message}
                    type={popupType}
                    onClose={() => setShowPopup(false)}
                />
            )}
            <ConfirmModal
                title="Yakin Menghapus Mitra?"
                description="Tindakan ini tidak dapat dibatalkan. Mitra yang dihapus akan secara permanen terhapus dari sistem."
                isOpen={showConfirmModal}
                onClose={() => {
                    setShowConfirmModal(false);
                    setPartnerToDelete(null);
                }}
                onConfirm={() => {
                    if (partnerToDelete !== null) {
                        hendleDeletePartner(partnerToDelete);
                    }
                    setPartnerToDelete(null);
                    setShowConfirmModal(false);
                }}
            />
            <div className="flex justify-between mb-4 sm:mb-6">
                <h1 className="text-lg font-medium text-gray-800">
                    Daftar Mitra / Partner
                </h1>
                <button
                    className="cursor-pointer bg-amber-950 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 hover:-translate-y-1 duration-150 ease-in text-sm"
                    onClick={handleAddPartner}
                >
                    <Plus size={20} />
                    <span>Tambah Mitra</span>
                </button>
            </div>
            <div>
                <PartnerTable
                    data={data}
                    onDelete={(id: number) => {
                        setPartnerToDelete(id);
                        setShowConfirmModal(true);
                    }}
                    onEdit={handleEditPartner}
                />
            </div>
        </div>
    );
}
