import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, io } from '../server.js';
const r = Router();
r.post('/register', async (req, res) => {
 const { email, password, name } = req.body;
 const hash = await bcrypt.hash(password,10);
 const user = await prisma.user.create({ data: { email,password:hash,name } });
 await prisma.publicStats.update({ where:{id:1}, data:{ totalClientsActive:{ increment:1 } } });
 io.emit('public_stats_updated', await prisma.publicStats.findUnique({where:{id:1}}));
 res.json(user);
});
r.post('/login', async (req, res) => {
 const u = await prisma.user.findUnique({ where:{ email:req.body.email } });
 if (!u || !(await bcrypt.compare(req.body.password, u.password))) return res.status(400).json({message:'Invalid'});
 const token = jwt.sign({id:u.id,role:u.role,email:u.email}, process.env.JWT_SECRET||'dev-secret', {expiresIn:'1d'});
 res.json({ token, user:{id:u.id,name:u.name,role:u.role,email:u.email} });
});
export default r;
