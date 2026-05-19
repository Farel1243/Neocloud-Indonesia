import { Router } from 'express';
import { prisma, io } from '../server.js';
import { auth } from '../middleware/auth.js';

const r = Router();
const actionLogs = {
  Start: ['Connecting to node...', 'Starting server...', 'Done'],
  Restart: ['Checking node...', 'Restarting service...', 'Done'],
  Shutdown: ['Sending command...', 'Shutdown process...', 'Done'],
  Kill: ['Force stopping process...', 'Kill signal sent...', 'Done'],
  Rebuild: ['Validating server...', 'Rebuilding disk...', 'Done'],
  'Reinstall OS': ['Preparing image...', 'Installing OS...', 'Done'],
  'Rescue Mode': ['Booting rescue mode...', 'Mounting disk...', 'Done']
};

r.get('/instances', auth, async (req, res) => {
  const orders = await prisma.order.findMany({ where: { userId: req.user.id, status: 'Active' } });
  const instances = await prisma.serverInstance.findMany({ where: { orderId: { in: orders.map(o => o.id) } } });
  res.json(instances);
});

r.post('/instances/:id/actions', auth, async (req, res) => {
  const action = req.body.action;
  const logs = actionLogs[action] || ['Processing...', 'Done'];
  const status = action === 'Shutdown' ? 'Shutdown' : action === 'Restart' ? 'Restarting' : action === 'Rebuild' ? 'Rebuilding' : 'Active';
  await prisma.serverInstance.update({ where: { id: req.params.id }, data: { status } });
  for (const log of logs) {
    const row = await prisma.serverAction.create({ data: { instanceId: req.params.id, action, status, log } });
    io.emit('panel_action_log', row);
  }
  io.emit('instance_status_updated', { id: req.params.id, status });
  res.json({ ok: true, status, logs });
});

export default r;
