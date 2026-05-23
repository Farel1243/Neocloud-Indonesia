import { Router } from 'express';
import { prisma, io } from '../server.js';
import { auth, adminOnly } from '../middleware/auth.js';
const r = Router();
r.post('/orders/:id/confirm', auth, adminOnly, async (req,res)=>{
 const order = await prisma.order.update({ where:{id:req.params.id}, data:{ status:'Activation Required' } });
 await prisma.publicStats.update({ where:{id:1}, data:{ totalOrdersSuccess:{increment:1} } });
 io.emit('payment_received', order);
 io.emit('public_stats_updated', await prisma.publicStats.findUnique({where:{id:1}}));
 res.json(order);
});
r.post('/orders/:id/activate', auth, adminOnly, async (req,res)=>{
 const instance = await prisma.serverInstance.upsert({ where:{orderId:req.params.id}, update:req.body, create:{orderId:req.params.id,...req.body,status:'Active'} });
 await prisma.order.update({ where:{id:req.params.id}, data:{ status:'Active' } });
 await prisma.publicStats.update({ where:{id:1}, data:{ totalServersActive:{increment:1}, totalVpsOnline:{increment:1}, totalRevenue:{increment:req.body.revenueIncrement || 0} } });
 io.emit('product_activated', instance);
 io.emit('public_stats_updated', await prisma.publicStats.findUnique({where:{id:1}}));
 res.json(instance);
});
export default r;
