require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('./generated/prisma');

const userRoutes = require('./modules/user/user.routes');
const authRoutes = require('./modules/auth/auth.routes');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

// inject prisma into req
app.use((req, _res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
  try {
    await prisma.$connect();
    res.send('DB connected ✅');
  } catch (err) {
    res.status(500).send('DB error: ' + err.message);
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
