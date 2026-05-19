'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API } from '../../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    fetch(`${API}/api/analytics/public-stats`).then(r => r.json()).then(setStats);
    const s = io(API);
    s.on('public_stats_updated', setStats);
    return () => s.disconnect();
  }, []);

  return <div className='p-6'>
    <h1 className='text-3xl font-bold text-cyan-300'>Dashboard User</h1>
    <p className='text-slate-300 mb-4'>Ringkasan akun, statistik, dan notifikasi realtime.</p>
    <div className='grid md:grid-cols-3 gap-4'>
      {Object.entries(stats).filter(([k])=>k!=='id').map(([k,v]) => <div className='card p-4 rounded-xl' key={k}><div className='text-xs text-slate-400'>{k}</div><div className='text-xl font-semibold'>{String(v)}</div></div>)}
    </div>
  </div>;
}
