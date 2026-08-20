import '../app.css'
import SideBarAdmin from '../component/admin_component/sidebar_admin'
import DashBoard from './DashBoard'
import DaftarWarga from './DaftarWarga'
import List from './List'
import { Router } from 'preact-router'
export default function AdminPage() {
    return (
        <>

            <div className="flex">
                <SideBarAdmin/>
                
                <main className="w-full min-h-screen md:pl-64 bg-slate-100 p-6">
                    <Router>
                        <DashBoard path="laporan_admin/admin" />
                        <DaftarWarga path="laporan_admin/daftar_warga" />
                        <List path="laporan_admin/list" />
                    </Router>
                </main>
            </div>


        </>
    )
}