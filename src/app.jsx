import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './app.css'

import { Router } from 'preact-router'
import AdminPage from './admin_page/AdminPage'
import WargaPage from './warga_page/WargaPage'

export function App() {

  return (
    <>
      <Router>
        <AdminPage path="/laporan_admin/admin" />

        <AdminPage path="/laporan_admin/daftar_warga" />

        <AdminPage path="/laporan_admin/list" />

        <WargaPage path="/laporan_warga/input_data"/>
        
      </Router>
    </>
  )
}
