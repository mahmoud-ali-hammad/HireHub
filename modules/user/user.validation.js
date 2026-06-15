const AppError = require('../common/errors/AppError');

exports.validateCreateUser = (data) => {
  const { email, passwordHash, name } = data || {};
  if (!email?.trim() || !name?.trim()) {
    throw new AppError('email and name are required', 400);
  }
  if (!passwordHash) {
    throw new AppError('passwordHash is required (use Auth)', 400);
  }
  return { email: email.trim().toLowerCase(), passwordHash, name: name.trim() };
};

exports.validateUpdateUser = (data) => {
  const allowed = ['name', 'headline', 'location', 'avatarUrl'];
  const payload = {};
  for (const key of allowed) {
    if (data?.[key] !== undefined) payload[key] = data[key];
  }
  if (Object.keys(payload).length === 0) {
    throw new AppError('No valid fields to update', 400);
  }
  return payload;
};
