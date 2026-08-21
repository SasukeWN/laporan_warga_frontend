import { Plus } from "lucide-react";
import '../app.css'
import FormLaporanWarga from "../component/warga_component/form_laporan_warga";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WargaPage() {

    const endpoint = import.meta.env.VITE_API_URL


    const [tampilForm, setTampilForm] = useState(false)
    const [isiData, setIsiData] = useState([])
    const [searchData, setSearchData] = useState('')


    const handleChange = (e) => {
        setSearchData(e.target.value)
    }


    const ListData = async () => {
        try {
            const response = await axios.get(`${endpoint}/api/laporan/data/laporan`)
            setIsiData(response.data.data)
            console.log(response.data.data)
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

    const searchFitur = isiData.filter((p) => {
        const gabunganTeks = `${p.Judul_laporan || ""} ${p.Nama_warga || ""} ${p.deskripsi || ""}`.toLowerCase();
        return gabunganTeks.includes(searchData.toLowerCase());
    });

    useEffect(() => {
        ListData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col">
            <FormLaporanWarga isTampil={tampilForm} tutupForm={() => setTampilForm(false)} />
            {/* ==================== NAVBAR ==================== */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5">

                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-indigo-200">
                            L
                        </div>

                        <span className="font-bold text-slate-900 tracking-tight">
                            LayananAduan
                        </span>

                    </div>



                    {/* Tambah Laporan */}
                    <button
                        onClick={() => setTampilForm(!tampilForm)}
                        className="
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-medium
                            transition
                            shadow-sm
                            shadow-indigo-200
                            flex
                            items-center
                            gap-2
                            cursor-pointer
                        "
                    >
                        <Plus
                            size={16}
                            strokeWidth={2}
                        />

                        Tambah Laporan
                    </button>

                </div>
            </header>


            {/* ==================== MAIN ==================== */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">

                {/* ==================== HERO ==================== */}
                <section className="text-center max-w-2xl mx-auto mb-10">
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-3">
                        Layanan Aspirasi & Pengaduan Cepat
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                        Sampaikan Kendala & Laporan Anda di Sini
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                        Pantau status laporan gangguan atau keluhan layanan
                        secara transparan. Kami berkomitmen untuk menindaklanjuti
                        setiap aduan dengan cepat.
                    </p>
                </section>


                {/* ==================== PANDUAN ==================== */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-sm">
                            1
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                                Isi Data Valid
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Masukkan NIK dan lokasi kejadian dengan benar
                                agar mudah diverifikasi.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-sm">
                            2
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                                Proses Dispatch
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Laporan akan langsung diteruskan ke tim
                                penanganan di lapangan.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-sm">
                            3
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                                Selesai & Dipantau
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Cek status laporan secara berkala hingga
                                penanganan selesai.
                            </p>
                        </div>
                    </div>
                </section>


                {/* ==================== DAFTAR LAPORAN ==================== */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">

                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Daftar Laporan Terbaru
                            </h2>
                            <p className="text-xs text-slate-500">
                                Rekapitulasi pengaduan publik yang masuk ke
                                sistem.
                            </p>
                        </div>

                        {/* Search */}
                        <div>
                            <input
                                onChange={handleChange}
                                value={searchData}
                                type="text"
                                placeholder="Cari laporan..."
                                className="
                                    px-3.5
                                    py-1.5
                                    text-xs
                                    border
                                    border-slate-200
                                    rounded-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500/20
                                    focus:border-indigo-500
                                    w-full
                                    sm:w-48
                                "
                            />
                        </div>
                    </div>


                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-400 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                                    {/* TAMBAH HEADER NOMOR DI SINI */}
                                    <th className="py-3 px-6 w-12 text-center">
                                        No
                                    </th>
                                    <th className="py-3 px-6">
                                        Pelapor (NIK)
                                    </th>
                                    <th className="py-3 px-6">
                                        Judul & Deskripsi
                                    </th>
                                    <th className="py-3 px-6">
                                        Lokasi
                                    </th>
                                    <th className="py-3 px-6">
                                        Status
                                    </th>
                                </tr>
                            </thead>


                            {/* DATA DARI API DI-LOOPING DI SINI */}
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {searchFitur && searchFitur.length > 0 ? (
                                    searchFitur.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                            {/* Nomor di-generate dari index array (index dimulai dari 0, jadi ditambah 1) */}
                                            <td className="py-4 px-6 text-center text-slate-500 font-medium">
                                                {index + 1}
                                            </td>

                                            <td className="py-4 px-6 text-slate-700 font-medium whitespace-nowrap">
                                                {item.Nama_warga}
                                            </td>

                                            <td className="py-4 px-6 min-w-[250px]">
                                                <p className="font-semibold text-slate-900 mb-1 line-clamp-1">
                                                    {item.Judul_laporan}
                                                </p>
                                                <p className="text-xs text-slate-500 block whitespace-normal break-all">
                                                    {item.deskripsi}
                                                </p>
                                            </td>

                                            <td className="py-4 px-6  text-xs  text-black">
                                                {item.Lokasi}
                                            </td>

                                            <td className="py-4 px-6 whitespace-nowrap">
                                                {/* Anda bisa mengubah warna class sesuai dengan status nanti */}
                                                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-slate-50 text-black border-slate-200">
                                                    {item.status_laporan}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Tampilan jika data masih kosong/sedang dimuat */
                                    <tr>
                                        <td colSpan="5" className="py-10 text-center text-slate-400">
                                            Tidak ada Laporan
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </section>

            </main>



            {/* ==================== FOOTER ==================== */}
            <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 mt-auto">
                Pusat Layanan Pengaduan Masyarakat © 2026
            </footer>

        </div>
    );
}