const baseSelect = {
  id: true,
  email: true,
  name: true,
  headline: true,
  location: true,
  avatarUrl: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

exports.create = (prisma, data) => {
  return prisma.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
    },
    select: baseSelect,
  });
};

exports.findById = (prisma, id) => {
  return prisma.user.findUnique({
    where: { id },
    select: baseSelect,
  });
};

exports.findPublicById = (prisma, id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      headline: true,
      location: true,
      avatarUrl: true,
    },
  });
};

exports.findByEmail = (prisma, email) => {
  return prisma.user.findUnique({ where: { email } });
};

exports.update = (prisma, id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: baseSelect,
  });
};

exports.list = async (prisma, { page, limit, search }) => {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }
    : undefined;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
      select: baseSelect,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, page, limit, total };
};
