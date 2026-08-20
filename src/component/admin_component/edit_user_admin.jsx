import axios, { Axios } from 'axios'
import '../../app.css'
import { useState, useEffect } from 'preact/hooks'

export default function EditUserAdmin({ tutupEdit, isTampil, dataBawaan }) {
    const endpoint = import.meta.env.VITE_API_URL
    const [FormData, setFormData] = useState({
        Nama_warga: '',
        Nik_Warga: ''
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
            const response = await axios.patch(`${endpoint}/api/warga/update/warga/${dataBawaan.id}`, FormData)
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
                Nik_Warga: dataBawaan.Nik_Warga
            })
        }

    }, [isTampil, dataBawaan])

    return (
        <>
            <div onMouseDown={(e) => {

                if (e.target === e.currentTarget) {
                    tutupEdit();
                }
            }} className={`fixed inset-0 z-70 transition-all duration-300 flex items-center justify-center bg-black/50 ${isTampil ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <form onSubmit={handleSubmit} onClick={(e) => { e.stopPropagation() }} className={`w-full transition-all duration-300 transform max-w-md max-h-[80vh] overflow-y-auto bg-white p-6 rounded-lg shadow-xl flex flex-col gap-4 ${isTampil ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-8'}`}>
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                        Data Warga
                    </h3>

                    <div className="flex flex-col gap-1" >
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
                        <label className="text-sm font-semibold text-gray-700">NIK:</label>
                        <input
                            required
                            value={FormData.Nik_Warga}
                            onChange={handleChange}
                            name='Nik_Warga'
                            type="number"
                            placeholder="Masukkan 16 digit NIK"
                            maxLength={16}
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