const {
  reqister,
  logIn,
  resetPassword,
} = require('../controllers/authControllers');

const router = require('express').Router();

router.post('/register', reqister);
router.post('/login', logIn);
router.post('/reset-password', resetPassword);

module.exports = router;
