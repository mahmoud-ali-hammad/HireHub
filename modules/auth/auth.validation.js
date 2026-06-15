const AppError = require('../common/errors/AppError');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validateRegister = (data) => {
  const { email, password, name } = data || {};

  if (!email?.trim() || !name?.trim()) {
    throw new AppError('email and name are required', 400);
  }
  if (!EMAIL_RE.test(email)) {
    throw new AppError('Invalid email format', 400);
  }
  if (!password || password.length < 8) {
    throw new AppError('Password must be at least 8 characters', 400);
  }

  return { email: email.trim().toLowerCase(), password, name: name.trim() };
};

exports.validateLogin = (data) => {
  const { email, password } = data || {};

  if (!email?.trim() || !password) {
    throw new AppError('email and password are required', 400);
  }

  return { email: email.trim().toLowerCase(), password };
};
