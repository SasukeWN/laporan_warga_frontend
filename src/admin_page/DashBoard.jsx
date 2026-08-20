import { useState, useEffect } from 'preact/hooks'
import { Users, ClipboardList, House, User, ShieldUser, FileText, Check, MapPin } from 'lucide-preact';
import '../app.css'
import axios from 'axios'



export default function DashBoard() {

    const [data, setData] = useState([])
    const [isiLaporan, setIsiLaporan] = useState([])
    const [isiDataLaporan, setDataLaporan] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const endpoint = import.meta.env.VITE_API_URL



    useEffect(() => {

        const ambildata = async () => {
            try {
                const response = await axios.get(`${endpoint}/api/warga/list/warga`)
                setData(response.data.data)

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        }

        const ListData = async () => {
            try {
                const response = await axios.get(`${endpoint}/api/laporan/list/laporan`)
                setIsiLaporan(response.data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        const dataLaporan = async () => {
            try {
                const response = await axios.get(`${endpoint}/api/laporan/data/laporan`)
                setDataLaporan(response.data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        ListData()
        ambildata()
        dataLaporan()

    }, [])
    const JumlahUser = data.length
    const JumlahLaporan = isiLaporan.length
    const LaporanSelesai = isiLaporan.filter(p => p.status_laporan === 'Sudah ditangani')
    const LaporanBelumSelesai = isiLaporan.filter(p => p.status_laporan === 'Belum ditangani')


    // if (loading) return <p>Sedang memuat data...</p>;
    // if (error) return <p>Terjadi kesalahan: {error}</p>;

    return (
        <>
            <div>

                <header className='md:mr-5 md:ml-5' >
                    <div className='flex bg-white/100 shadow-2xl rounded-2xl p-6 justify-between items-center'>
                        <div className='flex gap-3 '>
                            <span><User /></span>
                            <h2 className='text-bold text-shadow-2xs '>Dashboard</h2>
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-blue-100  border border-slate-100-blue-200 flex items-center justify-center text-blue-700 font-bold'>
                                WN
                            </div>
                            <p className='font-medium text-slate-700 text-sm'> Admin Baik</p>
                        </div>


                    </div>
                </header>



                <div className='p-7 overflow-y-auto lg:p-8 flex-1'>
                    <div className='p-4 mb-3'>
                        <h1 className='font-bold text-sm text-slate-700 w-auto'>Ringkasan:</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* jumlah data */}
                        <div className='p-6 gap-y-4 bg-white border border-slate-100 flex flex-col rounded-xl shadow-sm justify-between '>

                            <div className='text-sm font-bold flex gap-x-2 text-slate-500'>
                                <FileText className='text-orange-400' />
                                total data
                            </div>
                            <div className='font-bold text-3xl text-slate-700'>
                                {JumlahLaporan}
                            </div>

                        </div>

                        {/* jumlah user */}
                        <div className='p-6 gap-y-4 bg-white border border-slate-100 flex flex-col rounded-xl shadow-sm justify-between '>

                            <div className=' flex gap-x-2 flex text-sm font-medium text-slate-500'>
                                <Users className='text-blue-400' /> Total User
                            </div>
                            <div className='font-bold text-3xl text-orange-300'>
                                {JumlahUser}
                            </div>

                        </div>


                        {/* jumlah yang udah selesai */}
                        <div className='p-6 gap-y-4 bg-white border border-slate-100 flex flex-col rounded-xl shadow-sm justify-between '>

                            <div className='text-sm flex gap-x-2 font-medium text-slate-500'>
                                <Check className='text-green-500' />
                                Selesai
                            </div>
                            <div className='font-bold text-3xl text-green-500'>
                                {LaporanSelesai.length}
                            </div>

                        </div>

                        {/* jumlah yang belum selesai */}
                        <div className='p-6 gap-y-4 bg-white border border-slate-100 flex flex-col rounded-xl shadow-sm justify-between '>

                            <div className='text-sm flex gap-x-2 font-medium text-slate-500'>
                                Belum selesai
                            </div>
                            <div className='font-bold text-3xl text-slate-700'>
                                {LaporanBelumSelesai.length}
                            </div>

                        </div>
                    </div>

                </div>


                {/* Table usernya */}
                <div className='md:mr-5 md:ml-5 flex flex-col gap-6 '>
                    {/* Bagian Judul dan Info Jumlah */}
                    <div className="p-5 flex justify-between items-center bg-gray-50 border-b border-gray-100 rounded-t-xl">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                            <h1 className="text-base font-bold text-gray-800">Daftar Data Warga</h1>
                        </div>
                        <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200">
                            Total: {data.length} Warga
                        </span>
                    </div>


                    <div className="overflow-x-auto shadow-sm sm:rounded-b-xl border-x border-b border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-600">


                            <thead className="text-xs uppercase bg-gray-100/70 text-gray-500 font-bold tracking-wider">
                                <tr>

                                    <th className="px-6 py-3.5 text-center w-20">Id</th>
                                    <th className="px-6 py-3.5 text-left">Nama Warga</th>
                                    <th className="px-6 py-3.5 text-center">Nomor NIK</th>
                                </tr>
                            </thead>



                            <tbody className="divide-y divide-gray-100 bg-white">
                                {data.length === 0 ? (

                                    <tr>
                                        <td colSpan="3" className="px-6 py-10 text-center text-gray-400 italic">
                                            Tidak ada data warga ditemukan
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((p) => {
                                        return (
                                            <tr
                                                key={p.id}
                                                className="hover:bg-blue-50/40 odd:bg-white even:bg-gray-50/50 transition-colors duration-150"
                                            >

                                                <td className="px-6 py-4 text-center font-semibold text-gray-400">
                                                    #{p.id}
                                                </td>


                                                <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                                    {p.Nama_warga}
                                                </td>


                                                <td className="px-6 py-4 text-center font-mono font-bold text-black tracking-wide">
                                                    {p.Nik_Warga}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>

                        </table>
                    </div>


                    {/* Bagian Judul dan Info Jumlah */}
                    <div className="p-5 flex justify-between items-center bg-gray-50 border-b border-gray-100 rounded-t-xl">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                            <h1 className="text-base font-bold text-gray-800">Daftar Laporan</h1>
                        </div>
                        <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200">
                            Total: {isiDataLaporan.length} Laporan
                        </span>
                    </div>

                    <div className="overflow-x-auto shadow-sm sm:rounded-b-xl border-x border-b border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-600">
                            <thead className="text-xs uppercase bg-gray-100/70 text-gray-500 font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5 text-left w-20">Id</th>
                                    <th className="px-6 py-3.5 text-left">Nama Warga</th>
                                    <th className="px-6 py-3.5 text-left">Laporan</th>
                                    <th className="px-6 py-3.5 text-left">Deskripsi</th>
                                    <th className="px-6 py-3.5 text-center">Status Laporan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {isiDataLaporan.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-left font-medium text-gray-900">
                                            #{item.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.Nama_warga}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{item.Judul_laporan}</div>
                                            <div className="text-xs text-gray-500 flex gap-1"> <span><MapPin className='text-slate-900 text-sm font-bold' /></span>{item.Lokasi}</div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate">
                                            {item.deskripsi}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status_laporan === 'Sudah ditangani'
                                                ? 'bg-green-100 text-green-800 text-sm font-bold border-green-300 border-1'
                                                : 'bg-yellow-100 800 text-sm border-1 border-yellow-300 font-bold text-yellow-800'
                                                }`}>
                                                {item.status_laporan}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>



            </div>
        </>
    )


}