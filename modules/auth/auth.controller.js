const asyncHandler = require('express-async-handler');
const service = require('./auth.service');

exports.register = asyncHandler(async (req, res) => {
  const result = await service.register(req.prisma, req.body);
  res.status(201).json(result);
});

exports.login = asyncHandler(async (req, res) => {
  const result = await service.login(req.prisma, req.body);
  res.json(result);
});
