import axios from "axios";
import { useState, useEffect } from "preact/hooks";




export default function DeleteUserAdmin({ isTampil, tutupDelete, dataBawaan }) {
    const endpoint = import.meta.env.VITE_API_URL
    const [isdeleteData, setIsDeleteData] = useState({
        Nama_warga: '',
        Nik_Warga: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${endpoint}/api/warga/delete/warga/${dataBawaan.id}`)
            console.log(`berhasil hapus user`)
            window.location.reload();
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
                Nik_Warga: dataBawaan.Nik_Warga
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
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-gray-900">
                        Konfirmasi Hapus
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        Apakah Anda yakin ingin menghapus data warga dengan Nama <span className="font-bold text-gray-900">{isdeleteData.Nama_warga}</span> dan Nik <span className="font-bold text-gray-900">{isdeleteData.Nik_Warga}</span>?
                    </p>


                    <span className="text-xs font-medium text-red-500">
                        Tindakan ini tidak dapat dibatalkan.
                    </span>
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