const repo = require('./user.repository');
const { validateCreateUser, validateUpdateUser } = require('./user.validation');
const AppError = require('../common/errors/AppError');

exports.createUser = async (prisma, data) => {
  const payload = validateCreateUser(data);
  const exists = await repo.findByEmail(prisma, payload.email);
  if (exists) throw new AppError('Email already in use', 409);

  return repo.create(prisma, payload);
};

exports.getUserById = async (prisma, id) => {
  const user = await repo.findById(prisma, id);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

exports.getPublicUser = async (prisma, id) => {
  const user = await repo.findPublicById(prisma, id);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

exports.updateUser = async (prisma, id, data) => {
  const payload = validateUpdateUser(data);
  const user = await repo.findById(prisma, id);
  if (!user) throw new AppError('User not found', 404);
  return repo.update(prisma, id, payload);
};

exports.setActiveStatus = async (prisma, id, isActive) => {
  const user = await repo.findById(prisma, id);
  if (!user) throw new AppError('User not found', 404);
  return repo.update(prisma, id, { isActive });
};

exports.listUsers = async (prisma, query) => {
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || '10', 10), 1), 50);
  const search = query.search?.trim() || '';

  return repo.list(prisma, { page, limit, search });
};
