const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../user/user.repository');
const AppError = require('../common/errors/AppError');
const { validateRegister, validateLogin } = require('./auth.validation');

const accessTTL = '15m';

exports.register = async (prisma, body) => {
  const { email, password, name } = validateRegister(body);
  const existing = await userRepo.findByEmail(prisma, email);
  if (existing) throw new AppError('Email already in use', 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
    select: { id: true, email: true, name: true },
  });

  return { user };
};

exports.login = async (prisma, body) => {
  const { email, password } = validateLogin(body);
  const user = await userRepo.findByEmail(prisma, email);
  if (!user || !user.passwordHash)
    throw new AppError('Invalid credentials', 401);

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError('Invalid credentials', 401);

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: accessTTL }
  );

  return { accessToken };
};
