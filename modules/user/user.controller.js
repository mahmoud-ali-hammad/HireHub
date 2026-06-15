const asyncHandler = require('express-async-handler');
const service = require('./user.service');

exports.createUser = asyncHandler(async (req, res) => {
  const user = await service.createUser(req.prisma, req.body);
  res.status(201).json(user);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await service.getUserById(req.prisma, req.params.id);
  res.json(user);
});

exports.getPublicUser = asyncHandler(async (req, res) => {
  const user = await service.getPublicUser(req.prisma, req.params.id);
  res.json(user);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await service.updateUser(req.prisma, req.params.id, req.body);
  res.json(user);
});

exports.deactivateUser = asyncHandler(async (req, res) => {
  const user = await service.setActiveStatus(req.prisma, req.params.id, false);
  res.json(user);
});

exports.activateUser = asyncHandler(async (req, res) => {
  const user = await service.setActiveStatus(req.prisma, req.params.id, true);
  res.json(user);
});

exports.listUsers = asyncHandler(async (req, res) => {
  const users = await service.listUsers(req.prisma, req.query);
  res.json(users);
});
