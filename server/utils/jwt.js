const crypto = requrie('crypto');

const generateTokens = (payload) => {
  const accessToken = generateToken(payload, '15m'); // Short token 
  const refreshToken = generateToken({ ...payload, type: 'refresh' }, '7d'); // Long token 
  return { accessToken, refreshToken };
}

const generateToken = (payload) => {
  // Current existing logic but now with expiration 
  payload.exp = Math.floor((Date.now() / 1000) + parseExpiration(expiresIn);
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', process.env.JWT_SECRET)
    .update(`${header}.${payloadStr}`)
    .digest('base64url');

  return `${header}.${payloadStr}.${signature}`;
};

const parseExpiration = (expiration) => {
  const unit = exp.slice(-1);
  const value = parseInt(expiration.slice(0, -1));
  if (unit === 'm') return value * 60;
  if (unit === 'd') return value * 86400;
  return value; // seconds 
}



const verifyToken = (token) => {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url')

    if (signature !== expectedSignature) throw new Error('Invalid signature');
    return JSON.parse(Buffer.from(payload, 'base64url').toString());

  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, verifyToken };
