'use client';
import { useEffect,useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import { API } from '../lib/api';
export default function Home(){
 const [stats,setStats]=useState(null);
 useEffect(()=>{fetch(`${API}/api/analytics/public-stats`).then(r=>r.json()).then(setStats);const s=io(API);s.on('public_stats_updated',setStats);return()=>s.disconnect();},[]);
 const cards=stats?Object.entries(stats).filter(([k])=>k!=='id'):[];
 return <main><Navbar/><section className='p-8'><h1 className='text-5xl font-bold text-cyan-300'>Neocloud Indonesia</h1><p className='text-slate-300 mt-2'>Cloud hosting profesional realtime dan otomatis.</p><div className='grid md:grid-cols-4 gap-4 mt-6'>{cards.map(([k,v])=><div key={k} className='card p-4 rounded-xl'><p className='text-xs text-slate-300'>{k}</p><p className='text-2xl font-bold'>{v}</p></div>)}</div></section></main>
}
