import jwt from 'jsonwebtoken';

export default function generateToken(userId) {
  const token = jwt.sign({
    userId
  }, 'whatisthissecret?', {
    expiresIn: '7 days'
  });

  return token;
}