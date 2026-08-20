import '../../app.css';
import { useState } from 'preact/hooks';
import { Users, ClipboardList, House, ShieldUser, Menu, X } from 'lucide-preact';
import { Link } from 'preact-router';
import { Match } from 'preact-router/match';

export default function SideBarAdmin() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Tombol Hamburger Mobile */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg md:hidden shadow-lg hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay Layar Gelap (Mobile Only) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                <div className="p-8 border-b border-slate-700 flex items-center gap-4">
                    <ShieldUser className="w-8 h-8 text-red-500 hover:text-red-700 transition-colors" />
                    <h1 className="text-2xl font-bold">AdminPanel</h1>
                </div>

                <nav className="p-6 space-y-2 mt-4 font-semibold text-sm">
                    <Match path="/laporan_admin/admin">
                        {({ matches }) => (
                            <Link
                                href="/laporan_admin/admin"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                                    matches
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span><House /></span> Dashboard
                            </Link>
                        )}
                    </Match>

                    <Match path="/laporan_admin/daftar_warga">
                        {({ matches }) => (
                            <Link
                                href="/laporan_admin/daftar_warga"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                                    matches
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span><Users /></span> Users Management
                            </Link>
                        )}
                    </Match>

                    <Match path="/laporan_admin/list">
                        {({ matches }) => (
                            <Link
                                href="/laporan_admin/list"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                                    matches
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span><ClipboardList /></span> List Management
                            </Link>
                        )}
                    </Match>
                </nav>
            </aside>
        </>
    );
}