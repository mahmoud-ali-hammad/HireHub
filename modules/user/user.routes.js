const router = require('express').Router();
const controller = require('./user.controller');

// Public
router.get('/', controller.listUsers);
router.get('/:id/public', controller.getPublicUser);
router.get('/:id', controller.getUserById);

// Protected (add auth middleware later)
router.post('/', controller.createUser); // optional admin use
router.patch('/:id', controller.updateUser);
router.patch('/:id/deactivate', controller.deactivateUser);
router.patch('/:id/activate', controller.activateUser);

module.exports = router;
