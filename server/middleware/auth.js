const { verifyToken } = require('../utils/jwt.js');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();

  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }

};


const restrictTo = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access Denied' });
  }
  next();
};

module.exports = { authenticate, restrictTo };
