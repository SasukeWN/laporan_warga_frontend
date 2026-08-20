
import axios from 'axios'
import '../app.css'
import FormUserAdmin from '../component/admin_component/form_user_admin'
import EditUserAdmin from '../component/admin_component/edit_user_admin'
import DeleteUserAdmin from '../component/admin_component/delete_user_admin'
import { UserRoundPlus, Search, Pencil, Trash2 } from 'lucide-preact'
import { useState, useEffect } from 'preact/hooks'
export default function DaftarWarga() {

    const [dataWarga, setDataWarga] = useState([])
    const [tampilForm, setTampilForm] = useState(false)
    const [tampilEdit, setTampilEdit] = useState(false)
    const [tampilDelete, setTampilDelete] = useState(false)
    const [selectId, setSelectId] = useState(null)
    const endpoint = import.meta.env.VITE_API_URL



    const ListData = async () => {
        try {

            const response = await axios.get(`${endpoint}/api/warga/list/warga`)
            setDataWarga(response.data.data)
            

        } catch (error) {
            console.error("Gagal mengambil data warga:", error)
        }
    }

    useEffect(() => {
        ListData()
    }, [])

    return (
        <div className="relative pt-30">


            <div className="md:fixed top-4 right-0 left-0 md:left-64 z-50 flex justify-center px-4 md:px-6 ">

                <header className="w-full max-w-10xl bg-white shadow-xl rounded-2xl p-6 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <h2 className="font-bold  text-slate-800 ">Management User</h2>
                    </div>

                    <button className='bg-blue-700 p-4 hover:bg-blue-500 cursor-pointer transition-all rounded-2xl text-sm font-bold flex items-center gap-2 text-white' onClick={() => setTampilForm(!tampilForm)}>
                        {tampilForm ? 'Sembunyikan Form' : 'Tambah User'} <UserRoundPlus />
                    </button>
                </header>

            </div>


            {/* AREA KONTEN DAFTAR WARGA */}


            <FormUserAdmin isTampil={tampilForm} tutupForm={() => setTampilForm(false)} />
            <EditUserAdmin dataBawaan={dataWarga.find((warga) => warga.id === selectId)} isTampil={tampilEdit} tutupEdit={() => setTampilEdit(false)} />
            <DeleteUserAdmin dataBawaan={dataWarga.find((warga) => warga.id === selectId)} isTampil={tampilDelete} tutupDelete={() => setTampilDelete(false)} />
            

            <div className="fixed top-4 right-0 left-0 md:left-64 z-40 flex justify-center px-4 md:px-6">
                <header className="w-full max-w-[1000px] bg-white shadow-md shadow-slate-200/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-100">
                    <div>
                        <h2 className="font-bold text-xl text-slate-800">Manajemen Warga</h2>
                        <p className="text-sm text-slate-500 mt-1">Kelola data kependudukan warga desa</p>
                    </div>
                </header>
            </div>

            {/* --- KONTEN TABEL --- */}
            <div className="mt-8 relative z-10 flex justify-center px-4 md:px-6">
                <div className="w-full max-w-[1000px] mx-auto">

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200">
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">No</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">NIK</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right pr-6 w-32">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">






                                    {dataWarga.map((p, index) => {
                                        return (
                                            <tr key={p.id} className="hover:bg-blue-50/50 transition-colors group">
                                                {/* Nomor */}
                                                <td className="p-4 text-sm text-slate-500 text-center font-medium">
                                                    {index + 1}
                                                </td>

                                                {/* Nama */}
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">

                                                        <span className="font-semibold text-slate-800 text-sm">
                                                            {p.Nama_warga}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* NIK */}
                                                <td className="p-4">
                                                    <span className="font-mono text-sm text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                                                        {p.Nik_Warga}
                                                    </span>
                                                </td>

                                                {/* Aksi (Edit & Delete) */}
                                                <td className="p-4 text-right pr-6">
                                                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-50 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => {
                                                                setSelectId(p.id)
                                                                setTampilEdit(!tampilEdit)
                                                            }}
                                                            title="Edit Warga"
                                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                        >
                                                            <Pencil size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() =>{
                                                                setSelectId(p.id)
                                                                setTampilDelete(!tampilDelete)
                                                            }}
                                                            title="Hapus Warga"
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}


                                </tbody>
                            </table>

                        </div>

                        {/* Footer / Empty State Jaga-jaga */}
                        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex justify-center sm:justify-between items-center text-sm text-slate-500">
                            <span className="hidden sm:block">Total Data: {dataWarga.length}</span>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}