// Dependencies
const router = require('express').Router();
const passport = require('passport');

// Passport
require('../config/passport');

const requireAuth = passport.authenticate('user-jwt', { session: false });

// Controllers
const userControllers = require('../controllers/userControllers');

// Validators
const userValidator = require('../services/userValidator');

// Routes
router.get('/users/profile', requireAuth, (req, res) => {
    res.status(200).json({
        user: req.user,
    });
});

router.post('/users', userValidator.signup, userControllers.signup);
router.post('/users/auth/token', userValidator.login, userControllers.login);
router.get('/users/:userId', requireAuth, userControllers.retrieve);

module.exports = router;
