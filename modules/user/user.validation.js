exports.validateCreateUser = data => {
  const { email, passwordHash, name } = data || {};
  if (!email || !name) throw new Error('email and name are required');
  if (!passwordHash) throw new Error('passwordHash is required (use Auth)');
  return { email, passwordHash, name };
};

exports.validateUpdateUser = data => {
  const allowed = ['name', 'headline', 'location', 'avatarUrl'];
  const payload = {};
  for (const key of allowed) {
    if (data?.[key] !== undefined) payload[key] = data[key];
  }
  if (Object.keys(payload).length === 0) {
    throw new Error('No valid fields to update');
  }
  return payload;
};
