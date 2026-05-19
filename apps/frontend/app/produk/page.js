'use client';
import { useEffect, useState } from 'react';
import { API } from '../../lib/api';

export default function ProdukPage(){
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [regions, setRegions] = useState([]);
  useEffect(()=>{
    Promise.all([
      fetch(`${API}/api/catalog/products`).then(r=>r.json()),
      fetch(`${API}/api/catalog/providers`).then(r=>r.json()),
      fetch(`${API}/api/catalog/regions`).then(r=>r.json())
    ]).then(([p,pr,rg])=>{setProducts(p);setProviders(pr);setRegions(rg);});
  },[]);
  return <div className='p-6'><h1 className='text-3xl font-bold text-cyan-300'>Produk & Order Flow</h1>
  <div className='grid md:grid-cols-3 gap-4 mt-4'>
    <div className='card p-4 rounded-xl'><h2 className='font-semibold'>STEP 1-3</h2><p>Pilih produk, provider, dan paket.</p><p className='text-sm'>Provider aktif: {providers.length}</p></div>
    <div className='card p-4 rounded-xl'><h2 className='font-semibold'>STEP 4-6</h2><p>Pilih OS, region, dan durasi.</p><p className='text-sm'>Region online: {regions.length}</p></div>
    <div className='card p-4 rounded-xl'><h2 className='font-semibold'>STEP 7-8</h2><p>Pilih kebutuhan dan checkout invoice.</p><p className='text-sm'>Plan tersedia: {products.length}</p></div>
  </div></div>
}
