const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../user/user.repository');

const accessTTL = '15m';

exports.register = async (prisma, { email, password, name }) => {
  const existing = await userRepo.findByEmail(prisma, email);
  if (existing) throw new Error('Email already in use');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
    select: { id: true, email: true, name: true },
  });

  return { user };
};

exports.login = async (prisma, { email, password }) => {
  const user = await userRepo.findByEmail(prisma, email);
  if (!user || !user.passwordHash) throw new Error('Invalid credentials');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: accessTTL }
  );

  return { accessToken };
};
