// Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

// Models
const User = require('../models/user');

module.exports = {
    signin: async (req, res) => {
        try {
            const timestamp = new Date().getTime();
            const user = await User.create(req.body);
            const token = jwt.sign({ sub: user._id, iat: timestamp }, config.secret, {
                expiresIn: '3600',
            });
            return res.status(201).json({ user, token: `JWT ${token}` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error with server' });
        }
    },
    login: async (req, res) => {
        try {
            const timestamp = new Date().getTime();
            const user = await User.findOne({
                $or: [
                    { email: req.body.login.toLowerCase() },
                    { username: req.body.login.toLowerCase() },
                ],
            });
            if (!user) {
                return res.status(402).json({
                    message: "L'email, ou le nom d'utilisateur n'existe pas",
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err && !isMatch) {
                    return res.status(402).json({ message: 'La connexion a échoué. Mot de passe incorrect.' });
                }
                // Create token if the password matched and no error was thrown
                const token = jwt.sign({ sub: user._id, iat: timestamp }, config.secret, {
                    expiresIn: '1h', // in seconds
                });
                return res.status(200).json({ message: 'Authentication sucessful', token: `JWT ${token}` });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error with server' });
        }
    },
    retrieve: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ user });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error with server' });
        }
    },
};
