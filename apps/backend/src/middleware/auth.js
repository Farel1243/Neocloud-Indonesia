import jwt from 'jsonwebtoken';
export const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
  next();
};
export const adminOnly = (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Forbidden' });
