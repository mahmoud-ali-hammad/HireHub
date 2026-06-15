require("dotenv").config();

const express = require("express");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("./generated/prisma");
const pool = require("./db/dbConnection");
const AppError = require("./modules/common/errors/AppError");
const errorHandler = require("./modules/common/middleware/errorHandler");
const userRoutes = require("./modules/user/user.routes");
const authRoutes = require("./modules/auth/auth.routes");

const requiredEnv = ["DATABASE_URL", "JWT_SECRET"];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
  req.prisma = prisma;
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/test-db", async (_req, res, next) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
});

app.use((req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`),
);

const shutdown = async () => {
  server.close();
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
