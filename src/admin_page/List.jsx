import '../app.css'
import { useState, useEffect } from 'preact/hooks'
import { UserRoundPlus, Search, Pencil, Trash2, ClipboardPlus } from 'lucide-preact'
import axios from 'axios'
import FormLaporanAdmin from '../component/admin_component/form_laporan_admin'
import EditLaporanAdmin from '../component/admin_component/edit_laporan_admin'
import DeleteLaporanAdmin from '../component/admin_component/delete_laporan_admin'

export default function List() {
    const [tampilEdit, setTampilEdit] = useState(false)
    const [tampilForm, setTampilForm] = useState(false)
    const [tampilDelete, setTampilDelete] = useState(false)
    const [dataWarga, setDataWarga] = useState([])
    const [selectId, setSelectId] = useState(null)
    const endpoint = import.meta.env.VITE_API_URL

    const ListData = async () => {
        try {
            const response = await axios.get(`${endpoint}/api/laporan/data/laporan`)
            setDataWarga(response.data.data)
        } catch (error) {
            console.error("Gagal mengambil data warga:", error)
        }
    }

    useEffect(() => {
        ListData()
    }, [])

    return (
        <>
            <div className="relative pt-28 bg-slate-50/60 font-sans ">


                <div className="md:fixed top-4 right-0 left-0 md:left-64 z-50 flex justify-center px-4 md:px-6">
                    <header className="w-full max-w-6xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md shadow-slate-200/40 rounded-2xl p-4 md:px-6 flex justify-between items-center transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                                <ClipboardPlus size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-base text-slate-900 tracking-tight">Management Report</h2>
                                <p className="text-xs text-slate-500 hidden sm:block">Kelola dan pantau laporan masuk secara real-time</p>
                            </div>
                        </div>

                        <button
                            className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] px-4 py-2.5 cursor-pointer transition-all duration-200 rounded-xl text-sm font-semibold flex items-center gap-2 text-white shadow-sm shadow-blue-500/20"
                            onClick={() => setTampilForm(!tampilForm)}
                        >
                            <span>Tambah Laporan</span>
                            <ClipboardPlus size={18} />
                        </button>
                    </header>

                    <FormLaporanAdmin isTampil={tampilForm} tutupForm={() => setTampilForm(false)} />
                    <EditLaporanAdmin dataBawaan={dataWarga.find(warga => warga.id === selectId)} isTampil={tampilEdit} tutupEdit={() => setTampilEdit(false)} />
                    <DeleteLaporanAdmin dataBawaan={dataWarga.find(warga => warga.id === selectId)}
                        isTampil={tampilDelete}
                        tutupDelete={() => setTampilDelete(false)}
                        refreshData={ListData}
                    />



                </div>

                {/* --- KONTEN TABEL --- */}
                <div className="mt-6 relative z-10 flex justify-center px-4 md:px-6">
                    <div className="w-full max-w-6xl mx-auto">

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                            <th className="py-3.5 px-4 w-14 text-center">No</th>
                                            <th className="py-3.5 px-4">Nama Lengkap</th>
                                            <th className="py-3.5 px-4">Judul Laporan</th>
                                            <th className="py-3.5 px-4">Deskripsi</th>
                                            <th className="py-3.5 px-4">Lokasi</th>
                                            <th className="py-3.5 px-4 text-center">Status Laporan</th>
                                            <th className="py-3.5 px-4 text-right pr-6 w-28">Aksi</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {dataWarga.map((p, index) => {
                                            return (
                                                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                                                    {/* Nomor */}
                                                    <td className="p-4 text-slate-400 text-center font-medium text-xs">
                                                        {index + 1}
                                                    </td>

                                                    {/* Nama */}
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-semibold text-slate-800">
                                                                {p.Nama_warga}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Judul */}
                                                    <td className="p-4 max-w-[200px]">
                                                        <span className="font-medium text-slate-700 block truncate" title={p.Judul_laporan}>
                                                            {p.Judul_laporan}
                                                        </span>
                                                    </td>

                                                    {/* Deskripsi */}
                                                    <td className="p-4 max-w-[240px]">
                                                        <span
                                                            className="text-slate-500 text-xs block whitespace-normal break-all"
                                                        >
                                                            {p.deskripsi}
                                                        </span>
                                                    </td>

                                                    {/* Lokasi */}
                                                    <td className="p-4">
                                                        <span className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
                                                            {p.Lokasi}
                                                        </span>
                                                    </td>

                                                    {/* Status Laporan */}
                                                    <td className="p-4 text-center">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                                                            {p.status_laporan}
                                                        </span>
                                                    </td>

                                                    {/* Aksi (Edit & Delete) */}
                                                    <td className="p-4 text-right pr-6">
                                                        <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-70 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectId(p.id)
                                                                    setTampilEdit(!tampilEdit)
                                                                }}
                                                                title="Edit Laporan"
                                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            >
                                                                <Pencil size={16} />
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    setSelectId(p.id)
                                                                    setTampilDelete(!tampilDelete)
                                                                }}
                                                                title="Hapus Laporan"
                                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>


                            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500 font-medium">
                                <span>Menampilkan seluruh data laporan</span>
                                <span className="bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs font-semibold text-slate-700">
                                    Total Data: {dataWarga.length}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}