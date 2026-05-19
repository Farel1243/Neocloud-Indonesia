'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API } from '../../lib/api';

export default function PanelPage(){
  const [logs, setLogs] = useState([]);
  useEffect(()=>{ const s=io(API); s.on('panel_action_log',(d)=>setLogs(prev=>[d,...prev].slice(0,20))); return ()=>s.disconnect(); },[]);
  return <div className='p-6'>
    <h1 className='text-3xl font-bold text-cyan-300'>Panel VPS Realtime</h1>
    <div className='card p-4 rounded-xl mt-4 font-mono text-sm h-80 overflow-auto'>
      {logs.length===0 ? <div className='text-slate-400'>Waiting action logs...</div> : logs.map((l)=><div key={l.id}>{l.log}</div>)}
    </div>
  </div>
}
