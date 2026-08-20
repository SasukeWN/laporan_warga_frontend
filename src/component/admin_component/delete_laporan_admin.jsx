import axios from "axios";
import { useState, useEffect } from "preact/hooks";




export default function DeleteLaporanAdmin({ isTampil, tutupDelete, dataBawaan, refreshData }) {
    const endpoint = import.meta.env.VITE_API_URL
    const [isdeleteData, setIsDeleteData] = useState({
        Nama_warga: '',
        Judul_laporan: '',
        deskripsi: '',
        Lokasi: '',
        status_laporan: ''
    })



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${endpoint}/api/laporan/delete/laporan/${dataBawaan?.id}`)
            alert(`Data laporan berhasil dihapus`);
            tutupDelete()
            refreshData()

        } catch (error) {
            if (error.response) {
                const pesanError = error.response.data.message;

                if (pesanError.toLowerCase().includes("foreign key") || pesanError.toLowerCase().includes("parent row")) {
                    alert("Data tidak bisa dihapus karena masih ada data laporan yang menggunakan nama warga ini.");
                } else {

                    alert(`Gagal: ${pesanError}`);
                }
            } else {
                alert("Tidak dapat terhubung ke server.");
            }
        }

    }

    useEffect(() => {
        if (isTampil && dataBawaan) {
            setIsDeleteData({
                Nama_warga: dataBawaan.Nama_warga,
                Judul_laporan: dataBawaan.Judul_laporan,
                deskripsi: dataBawaan.deskripsi,
                Lokasi: dataBawaan.Lokasi,
                status_laporan: dataBawaan.status_laporan
            })
        }

    }, [isTampil, dataBawaan])



    return (
        <div onMouseDown={(e) => {
            // Modal HANYA tutup jika titik klik murni mengenai backdrop luar, bukan anak elemennya
            if (e.target === e.currentTarget) {
                tutupEdit();
            }
        }} className={`fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 transition-all duration-300 ${isTampil ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm flex flex-col gap-4 rounded-xl bg-white p-6 text-center shadow-2xl transition-all duration-300">

                {/* Warning Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                {/* Text Area */}
                <div className="flex flex-col gap-3">
                    {/* Judul Modal */}
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                        Hapus Laporan Admin
                    </h3>

                    {/* Deskripsi Utama */}
                    <p className="text-sm text-gray-500 leading-relaxed px-2">
                        Apakah Anda yakin ingin menghapus data laporan ini? Tindakan ini akan menghapus seluruh riwayat data terkait secara permanen.
                    </p>

                    {/* Kotak Detail Data yang Akan Dihapus */}
                    <div className="mt-2 rounded-xl bg-gray-50 p-4.5 text-left border border-gray-100 flex flex-col gap-3">
                        {/* Baris Nama Warga */}
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Nama Pelapor
                            </span>
                            <span className="text-sm font-medium text-gray-800 break-words">
                                {isdeleteData.Nama_warga || "Tidak ada nama"}
                            </span>
                        </div>

                        {/* Garis Pembatas Tipis */}
                        <div className="h-[1px] w-full bg-gray-200/60" />

                        {/* Baris Judul Laporan */}
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Judul Laporan
                            </span>
                            <span className="text-sm font-medium text-gray-800 break-words">
                                {isdeleteData.Judul_laporan || "Tidak ada judul"}
                            </span>
                        </div>
                    </div>

                    {/* Peringatan Fatal */}
                    <div className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-red-50 py-2 px-3 text-red-700 border border-red-100/50">
                        <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold tracking-wide">
                            Tindakan ini tidak dapat dibatalkan!
                        </span>
                    </div>
                </div>


                {/* Action Buttons */}
                <div className="mt-2 flex gap-3">
                    <button
                        onClick={tutupDelete}
                        type="button"
                        className="flex-1 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={(handleSubmit)}
                        type="submit"
                        className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 hover:bg-red-700 transition-colors"
                    >
                        Ya, Hapus
                    </button>
                </div>

            </div>
        </div>
    );
}