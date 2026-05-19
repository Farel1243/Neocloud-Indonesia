const items=['Dashboard','Produk','Pesanan','Panel','Riwayat','Reseller Center','Profil'];
export default function Navbar(){return <nav className='p-4 flex gap-4 border-b border-cyan-900'>{items.map(i=><a key={i} href={`/${i.toLowerCase().replace(/ /g,'-')}`} className='text-cyan-200'>{i}</a>)}</nav>}
