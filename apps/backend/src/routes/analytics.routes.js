import { Router } from 'express';
import { prisma } from '../server.js';
const r = Router();
r.get('/public-stats', async (_req,res)=> res.json(await prisma.publicStats.findUnique({where:{id:1}})));
export default r;
