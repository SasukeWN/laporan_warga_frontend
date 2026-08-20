import '../../app.css'
import { Users, ClipboardList, House, ShieldUser } from 'lucide-preact';
import { Link } from 'preact-router';
import { Match } from 'preact-router/match';

export default function SideBarAdmin() {

    return (
       
        <aside className='fixed top-0 left-0 z-50 h-screen w-64 -translate-x-full md:translate-x-0 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300'>


            <div class="p-8 border-b border-slate-700 flex items-center gap-4">
                <ShieldUser className='w-8 h-8 text-red-500 hover:text-red-700 transition-colors' />
                <h1 class="text-2xl font-bold">AdminPanel</h1>
            </div>

            <nav className='p-6 space-y-2 mt-4 font-semibold text-sm'>

                <Match path='/laporan_admin/admin'>
                    {({ matches }) => {
                        return (
                            <Link
                                href='/laporan_admin/admin'
                                className={`flex text-black items-center gap-3 px-4 py-4 rounded-xl transition-all ${matches
                                    ? 'bg-indigo-600 text-black shadow-md hover:text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <span><House /></span> dashboard
                            </Link>
                        );
                    }}
                </Match>



                <Match path='/laporan_admin/daftar_warga'>
                    {({ matches }) => (

                        <Link
                            href='/laporan_admin/daftar_warga'
                            className={`flex text-black items-center gap-3 px-4 py-4 rounded-xl transition-all ${matches
                                ? 'bg-indigo-600 text-black shadow-md hover:text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <span><Users /></span> Users Management
                        </Link>
                    )
                    }

                </Match>

                <Match path='/laporan_admin/list'>
                    {({ matches }) => (
                        <Link
                            href='/laporan_admin/list'
                            className={`flex text-black items-center gap-3 px-4 py-4 rounded-xl transition-all ${matches
                                ? 'bg-indigo-600 text-black shadow-md hover:text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <span><ClipboardList /></span> List Management
                        </Link>
                    )
                    }

                </Match>



            </nav>


        </aside>
    );

}