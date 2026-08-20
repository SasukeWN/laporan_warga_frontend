import { useEffect } from 'preact/hooks'
import { Router, route } from 'preact-router'
import './app.css'

import AdminPage from './admin_page/AdminPage'
import WargaPage from './warga_page/WargaPage'

// Komponen helper untuk melakukan redirect otomatis
const Redirect = ({ to }) => {
  useEffect(() => {
    route(to, true) // true berfungsi me-replace history browser
  }, [to])
  return null
}

export function App() {
  return (
    <Router>
      {/* Pengunjung yang membuka domain utama (/) langsung diarahkan ke form warga */}
      <Redirect path="/" to="/laporan_warga/input_data" />

      <AdminPage path="/laporan_admin/admin" />
      <AdminPage path="/laporan_admin/daftar_warga" />
      <AdminPage path="/laporan_admin/list" />

      <WargaPage path="/laporan_warga/input_data" />
    </Router>
  )
}