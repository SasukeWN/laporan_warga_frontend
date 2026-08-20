import axios, { Axios } from 'axios'
import '../../app.css'
import { useState, useEffect } from 'preact/hooks'
import { Database } from 'lucide-preact'

export default function EditLaporanAdmin({ tutupEdit, isTampil, dataBawaan }) {

    const endpoint = import.meta.env.VITE_API_URL
    const [FormData, setFormData] = useState({
        Nama_warga: '',
        Judul_laporan: '',
        deskripsi: '',
        Lokasi: '',
        status_laporan: ''
    })

    const handleChange = (a) => {
        setFormData({
            ...FormData,
            [a.target.name]: a.target.value
        })
    }

    const handleSubmit = async (a) => {
        a.preventDefault()

        try {
            const response = await axios.patch(`${endpoint}/api/laporan/update/laporan/${dataBawaan.id}`, FormData)
            alert("Data berhasil diedit!");
            tutupEdit()
            window.location.reload();

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

    useEffect(() => {

        if (isTampil && dataBawaan) {
            setFormData({
                Nama_warga: dataBawaan.Nama_warga,
                Judul_laporan: dataBawaan.Judul_laporan,
                deskripsi: dataBawaan.deskripsi,
                Lokasi: dataBawaan.Lokasi,
                status_laporan: dataBawaan.status_laporan
            })
        }

    }, [isTampil, dataBawaan])

    return (
        <>
            <div onMouseDown={(e) => {
                // Modal HANYA tutup jika titik klik murni mengenai backdrop luar, bukan anak elemennya
                if (e.target === e.currentTarget) {
                    tutupEdit();
                }
            }} className={`fixed inset-0 z-70 transition-all duration-300 flex items-center justify-center bg-black/50 ${isTampil ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <form onSubmit={handleSubmit} onClick={(e) => { e.stopPropagation() }} className={`w-full transition-all duration-300 transform max-w-md max-h-[80vh] overflow-y-auto bg-white p-6 rounded-lg shadow-xl flex flex-col gap-4 ${isTampil ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-8'}`}>
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                        Data Warga
                    </h3>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Nama Warga:</label>
                        <input
                            required
                            value={FormData.Nama_warga}
                            onChange={handleChange}
                            name='Nama_warga'
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Judul Laporan:</label>
                        <input
                            required
                            value={FormData.Judul_laporan}
                            onChange={handleChange}
                            name='Judul_laporan'
                            type="text"
                            placeholder="edit Judul Laporan"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="deskripsi" className="text-sm font-semibold text-gray-700">
                            Deskripsi:
                        </label>
                        <textarea
                            required
                            id="deskripsi"
                            value={FormData.deskripsi}
                            onChange={handleChange}
                            name="deskripsi"
                            rows="4"
                            placeholder="Edit deskripsi laporan secara lengkap..."
                            className="
                            w-full 
                            px-3 
                            py-2 
                            border 
                            border-gray-300 
                            rounded-md 
                            text-sm 
                            focus:outline-none 
                            focus:ring-2 
                          focus:ring-blue-500 
                           transition-colors 
                            resize-y 
                             min-h-[100px]
            
                      "
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Lokasi:</label>
                        <input
                            required
                            value={FormData.Lokasi}
                            onChange={handleChange}
                            name='Lokasi'
                            type="text"
                            placeholder="edit Judul Laporan"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="status" className="text-sm font-semibold text-gray-700">
                            Status Laporan
                        </label>

                        <select
                            id="status"
                            name="status_laporan"
                            onChange={handleChange}
                            value={FormData.status_laporan || ""}
                            className="w-full px-3 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer"
                        >
                            <option value="" disabled hidden>
                                Pilih status laporan...
                            </option>

                            <option value="Belum ditangani" className="bg-red-100 text-red-700">
                                Belum Ditangani
                            </option>

                            <option value="Proses" className="bg-yellow-100 text-yellow-700">
                                Proses
                            </option>

                            <option value="Sudah ditangani" className="bg-green-100 text-green-700">
                                Sudah Ditangani
                            </option>
                        </select>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            type='submit'
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Simpan
                        </button>
                        <button
                            onClick={tutupEdit}
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