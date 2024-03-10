import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = { email: string };

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): TokenPayload | string {
  try {
    const data = jwt.verify(token, secret) as TokenPayload;
    return data;
  } catch (error) {
    return 'Token must be a valid token';
  }
}

export default {
  sign,
  verify,
};
