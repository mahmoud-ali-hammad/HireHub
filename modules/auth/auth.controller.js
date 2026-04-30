const service = require('./auth.service');

exports.register = async (req, res) => {
  try {
    const result = await service.register(req.prisma, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await service.login(req.prisma, req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
