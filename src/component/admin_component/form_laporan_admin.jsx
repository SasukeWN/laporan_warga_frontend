import axios from "axios"
import { useState } from "react"

export default function FormLaporanAdmin({ isTampil, tutupForm }) {


    const [data, setIsiData] = useState({
        Nik_Warga: '',
        Judul_laporan: '',
        deskripsi: '',
        Lokasi: ''
    })
   const endpoint = import.meta.env.VITE_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(`${endpoint}/api/laporan/create/laporan`, data)
            alert("berhasil menambahkan data")
            setIsiData({
                Nik_Warga: '',
                Judul_laporan: '',
                deskripsi: '',
                Lokasi: ''
            })
            window.location.reload()
            tutupForm()


        } catch (error) {
            if (error.response) {
                const pesanError = error.response.data.message;
                const statusError = error.response.data.status;


                alert(`Gagal (${statusError}): ${pesanError}`);
            } else {

                alert("Tidak dapat terhubung ke server.");
            }
        }
    }

    const handleChange = (a) => {
        setIsiData({
            ...data,
            [a.target.name]: a.target.value
        })
    }


    return (
        <>
            <div onMouseDown={(e) => {
                // Modal HANYA tutup jika titik klik murni mengenai backdrop luar, bukan anak elemennya
                if (e.target === e.currentTarget) {
                    tutupForm();
                }
            }} className={`fixed inset-0 z-70 transition-all duration-300 flex items-center justify-center bg-black/50 ${isTampil ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className={`w-full transition-all duration-300 transform max-w-md max-h-[80vh] overflow-y-auto bg-white p-6 rounded-lg shadow-xl flex flex-col gap-4  ${isTampil ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-8'}`}>
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                        Data Warga
                    </h3>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Nik:</label>
                        <input
                            required
                            name='Nik_Warga'
                            value={data.Nik_Warga}
                            onChange={handleChange}
                            type="number"
                            placeholder="Masukan NIK"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Judul Laporan:</label>
                        <input
                            required
                            name="Judul_laporan"
                            value={data.Judul_laporan}
                            onChange={handleChange}
                            type="text"
                            placeholder="Judul Laporan"

                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Deskripsi:</label>
                        <input
                            required
                            name="deskripsi"
                            onChange={handleChange}
                            value={data.deskripsi}
                            placeholder="Deskripsi"

                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Lokasi:</label>
                        <input
                            required
                            name="Lokasi"
                            onChange={handleChange}
                            value={data.Lokasi}
                            placeholder="Lokasi"

                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            type='submit'
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Simpan
                        </button>
                        <button
                            onClick={tutupForm}
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white text-sm font-bold rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}