const asyncHandler = require('express-async-handler');
const service = require('./user.service');
const AppError = require('../common/errors/AppError');

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await service.createUser(req.prisma, req.body);
  res.status(201).json(user);
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await service.getUserById(req.prisma, req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.json(user);
});

exports.getPublicUser = asyncHandler(async (req, res, next) => {
  const user = await service.getPublicUser(req.prisma, req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.json(user);
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await service.updateUser(req.prisma, req.params.id, req.body);
  if (!user) return next(new AppError('User not found', 404));
  res.json(user);
});

exports.deactivateUser = asyncHandler(async (req, res, next) => {
  const user = await service.setActiveStatus(req.prisma, req.params.id, false);
  if (!user) return next(new AppError('User not found', 404));
  res.json(user);
});

exports.activateUser = asyncHandler(async (req, res, next) => {
  const user = await service.setActiveStatus(req.prisma, req.params.id, true);
  if (!user) return next(new AppError('User not found', 404));
  res.json(user);
});

exports.listUsers = asyncHandler(async (req, res, next) => {
  const users = await service.listUsers(req.prisma, req.query);
  res.json(users);
});
