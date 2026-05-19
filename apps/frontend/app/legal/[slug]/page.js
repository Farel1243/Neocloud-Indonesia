const pages={
 'terms-of-service':'Syarat layanan Neocloud Indonesia...',
 'privacy-policy':'Kebijakan privasi data pelanggan...',
 'cookie-policy':'Kebijakan cookie dan tracking...',
 'refund-policy':'Kebijakan pengembalian dana...',
 'vps-abuse-policy':'Kebijakan abuse VPS...',
 'anti-spam-policy':'Kebijakan anti spam...',
 'dmca-policy':'Kebijakan DMCA...',
 'suspended-policy':'Kebijakan suspend layanan...'
};
export default function Legal({params}){return <div className='p-8'><h1 className='text-3xl'>{params.slug}</h1><p>{pages[params.slug]||'Dokumen legal.'}</p></div>}
