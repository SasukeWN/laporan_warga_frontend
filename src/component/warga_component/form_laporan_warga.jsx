import '../../app.css'
import axios from 'axios';
import { useState } from 'preact/hooks';

export default function FormLaporanWarga({ isTampil, tutupForm }) {

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
        <div onMouseDown={(e) => {

            if (e.target === e.currentTarget) {
                tutupForm();
            }
        }} className={`fixed inset-0 z-50 flex items-center justify-center transition-all
                    
                     bg-black/50 px-4  ${isTampil ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

            <section
                id="form-laporan"
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-2xl
                    p-6
                    sm:p-8
                    w-full
                    max-w-2xl
                    max-h-[90vh]
                    overflow-y-auto
                    transition-all
                    duration-300
                    ease-out
                     ${isTampil ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-8'}
                    `}
            >

                {/* Header */}
                <div className="mb-6 border-b border-slate-100 pb-4">

                    <h3 className="text-lg font-bold text-slate-900">
                        Formulir Tambah Laporan Baru
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                        Lengkapi kolom di bawah ini untuk mengirimkan
                        pengaduan atau kendala baru.
                    </p>

                </div>


                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* NIK */}
                    <div>
                        <label
                            htmlFor="nik"
                            className="
                                block
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-600
                                mb-1.5
                            "
                        >
                            NIK Pelapor
                        </label>

                        <input
                            name="Nik_Warga"
                            value={data.Nik_Warga}
                            onChange={handleChange}
                            type="text"
                            placeholder="Masukkan 16 digit NIK..."
                            className="
                                w-full
                                px-3.5
                                py-2.5
                                text-sm
                                border
                                border-slate-200
                                rounded-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500/20
                                focus:border-indigo-500
                            "
                        />
                    </div>


                    {/* Judul */}
                    <div>
                        <label
                            htmlFor="judul"
                            className="
                                block
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-600
                                mb-1.5
                            "
                        >
                            Judul Laporan
                        </label>

                        <input
                            value={data.Judul_laporan}
                            name="Judul_laporan"
                            onChange={handleChange}
                            type="text"
                            placeholder="Contoh: Gangguan Jaringan / Tiang Miring"
                            className="
                                w-full
                                px-3.5
                                py-2.5
                                text-sm
                                border
                                border-slate-200
                                rounded-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500/20
                                focus:border-indigo-500
                            "
                        />
                    </div>


                    {/* Lokasi */}
                    <div>
                        <label
                            htmlFor="lokasi"
                            className="
                                block
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-600
                                mb-1.5
                            "
                        >
                            Lokasi / Alamat Kejadian
                        </label>

                        <input
                            onChange={handleChange}
                            value={data.Lokasi}
                            name="Lokasi"
                            type="text"
                            placeholder="Nama jalan, nomor, atau patokan lokasi..."
                            className="
                                w-full
                                px-3.5
                                py-2.5
                                text-sm
                                border
                                border-slate-200
                                rounded-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500/20
                                focus:border-indigo-500
                            "
                        />
                    </div>


                    {/* Deskripsi */}
                    <div>
                        <label
                            htmlFor="deskripsi"
                            className="
                                block
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-600
                                mb-1.5
                            "
                        >
                            Deskripsi Lengkap
                        </label>

                        <textarea
                            onChange={handleChange}
                            value={data.deskripsi}
                            name="deskripsi"
                            rows="4"
                            placeholder="Jelaskan kendala yang Anda alami secara detail..."
                            className="
                                w-full
                                px-3.5
                                py-2.5
                                text-sm
                                border
                                border-slate-200
                                rounded-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500/20
                                focus:border-indigo-500
                                resize-none
                            "
                        />
                    </div>

                    <div className='flex justify-end items-center'>

                        <div className="pt-2 flex gap-2 items-center w-full">

                            <button
                                onClick={tutupForm}
                                type="button"
                                className="
                                w-full
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                font-medium
                                py-2.5
                                rounded-xl
                                text-sm
                                transition
                                shadow-sm
                                shadow-red-200
                                cursor-pointer
                            "
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="
                                w-full
                                bg-indigo-600
                                hover:bg-indigo-700
                                text-white
                                font-medium
                                py-2.5
                                rounded-xl
                                text-sm
                                transition
                                shadow-sm
                                shadow-indigo-200
                                cursor-pointer
                            "
                            >
                                Kirim Laporan Sekarang
                            </button>



                        </div>
                    </div>

                </form >

            </section >

        </div >
    )
}