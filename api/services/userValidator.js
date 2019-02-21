const utils = require('../utils/functions');


exports.login = (req, res, next) => {
    req.checkBody('login', "Vous devez saisir un email ou un nom d'utilisateur").notEmpty();
    req.checkBody('password', 'Vous devez saisir un mot de passe').notEmpty();

    const errors = {};

    const validations = req.validationErrors();

    if (validations) {
        validations.forEach((data) => {
            if (data.param === 'login') {
                errors.login = data.msg;
            }
            if (data.param === 'password') {
                errors.password = data.msg;
            }
        });
    }

    if (!utils.isEmpty(errors)) {
        res.status(422).json({ errors });
    } else {
        next();
    }
};

exports.signup = (req, res, next) => {
    req.checkBody('username', "Vous devez saisir un nom d'utilisateur").notEmpty();
    req.checkBody('email', 'Vous devez saisir un email').notEmpty();
    req.checkBody('password', 'Vous devez saisir un mot de passe')
        .notEmpty()
        .equals('confirm_password')
        .withMessage('Le mot de passe de confirmation est différent');
    req.checkBody('confirm_password', 'Vous devez confirmer le mot de passe').notEmpty();

    const errors = {};

    const validations = req.validationErrors();

    if (validations) {
        validations.forEach((data) => {
            if (data.param === 'username') {
                errors.username = data.msg;
            }
            if (data.param === 'email') {
                errors.email = data.msg;
            }
            if (data.param === 'password') {
                errors.password = data.msg;
            }
            if (data.param === 'confirm_password') {
                errors.confirm_password = data.msg;
            }
        });
    }

    if (!utils.isEmpty(errors)) {
        res.status(422).json({ errors });
    } else {
        next();
    }
};
