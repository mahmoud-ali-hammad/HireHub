const service = require('./user.service');

exports.createUser = async (req, res) => {
  try {
    const user = await service.createUser(req.prisma, req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await service.getUserById(req.prisma, req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getPublicUser = async (req, res) => {
  try {
    const user = await service.getPublicUser(req.prisma, req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await service.updateUser(req.prisma, req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    const user = await service.setActiveStatus(
      req.prisma,
      req.params.id,
      false
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const user = await service.setActiveStatus(req.prisma, req.params.id, true);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await service.listUsers(req.prisma, req.query);
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
