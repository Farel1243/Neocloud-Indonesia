'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API } from '../../lib/api';

export default function AdminPage(){
  const [regions, setRegions] = useState([]);
  useEffect(()=>{
    fetch(`${API}/api/catalog/regions`).then(r=>r.json()).then(setRegions);
    const s=io(API); s.on('region_ping_updated',setRegions); return ()=>s.disconnect();
  },[]);
  return <div className='p-6'><h1 className='text-3xl font-bold text-cyan-300'>Admin Monitoring Region</h1>
  <div className='grid md:grid-cols-2 gap-4 mt-4'>{regions.map(r=><div key={r.id} className='card p-4 rounded-xl'><h2 className='font-semibold'>{r.name}</h2><p>Latency: {r.latencyMs}ms</p><p>Packet Loss: {r.packetLoss}%</p><p>CPU: {r.cpuUsage}% | RAM: {r.ramUsage}%</p><p>Status: {r.status}</p></div>)}</div></div>
}
