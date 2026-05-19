import { Router } from 'express';
import { prisma, io } from '../server.js';
import { auth } from '../middleware/auth.js';
const r = Router();
r.post('/', auth, async (req,res)=>{
 const order = await prisma.order.create({ data:{ userId:req.user.id, status:'Waiting Payment', total:req.body.total, productType:req.body.productType } });
 await prisma.publicStats.update({ where:{id:1}, data:{ totalProductsSold:{ increment:1 } } });
 io.emit('order_created', order);
 io.emit('public_stats_updated', await prisma.publicStats.findUnique({where:{id:1}}));
 res.json(order);
});
export default r;
