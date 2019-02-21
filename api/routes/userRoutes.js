// Dependencies
const router = require('express').Router();

// Controllers
const userControllers = require('../controllers/userControllers');

// Routes
router.post('/users', userControllers.signin);
router.post('/users/auth/token', userControllers.login);
router.get('/users/:userId', userControllers.retrieve);

module.exports = router;
