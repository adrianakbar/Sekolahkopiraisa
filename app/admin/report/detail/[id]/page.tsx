"use client";

import { useRouter } from "next/navigation";

export default async function ReportDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const reportId = parseInt(params.id, 10);
    const router = useRouter();

    // Simulate fetching report details from an API
    const fetchReportDetails = async (id: number) => {
        return {
            id,
            title: "Laporan Kegiatan P4S",
            city: "Kota A",
            eventType: "Pelatihan Pertanian",
            domParticipant: "Jepang",
            sumParticipant: "150",
            date: "2023-10-01",
            image: "/images/report1.jpg",
        };
    };

    const reportDetails = await fetchReportDetails(reportId);

    const handleBack = () => {
        router.push("/admin/report");
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
                Detail Laporan
            </h1>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6">
                {/* Data (1/3 kiri) */}
                <div className="md:w-1/3 w-full flex flex-col justify-center mb-4 md:mb-0">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        {reportDetails.title}
                    </h2>
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row">
                            <span className="sm:w-40 text-gray-500">Kota</span>
                            <span className="text-gray-700">
                                {reportDetails.city}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <span className="sm:w-40 text-gray-500">
                                Tipe Kegiatan
                            </span>
                            <span className="text-gray-700">
                                {reportDetails.eventType}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <span className="sm:w-40 text-gray-500">
                                Domisili Peserta
                            </span>
                            <span className="text-gray-700">
                                {reportDetails.domParticipant}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <span className="sm:w-40 text-gray-500">
                                Jumlah Peserta
                            </span>
                            <span className="text-gray-700">
                                {reportDetails.sumParticipant}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <span className="sm:w-40 text-gray-500">
                                Tanggal
                            </span>
                            <span className="text-gray-700">
                                {new Date(
                                    reportDetails.date
                                ).toLocaleDateString("id-ID")}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Gambar (2/3 kanan) */}
                <div className="md:w-2/3 w-full flex items-center">
                    <img
                        src={reportDetails.image}
                        alt={reportDetails.title}
                        className="w-full h-40 sm:h-64 object-cover rounded-lg"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleBack}
                    className="cursor-pointer bg-primary text-white py-2 px-3 text-sm font-medium rounded-xl hover:-translate-y-1 duration-150 ease-in flex justify-center items-center gap-2 disabled:opacity-50"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}
