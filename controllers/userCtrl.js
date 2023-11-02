const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRepo = require('../repositories/userRepo');
const config = require('../config');

const hasValidationError = (err) => err.message
    && err.message.indexOf('users validation failed') > -1;

const hasConflict = (err) => err.message
    && err.message.indexOf('duplicate key error');

const signup = async (req, res) => {
    try {
        const { body } = req;
        body.role = 'User';
        body.createdDate = new Date();
        body.password = await bcrypt.hash(body.password, 2);
        await userRepo.add(req.body);
        res.status(201);
        res.send('Created');
    } catch (err) {
        if (hasValidationError(err)) {
            res.status(400);
            res.json(err.errors);
        }
        else if (hasConflict(err)) {
            res.status(409);
            res.send('Email already exists');
        } else {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    }
};

const signin = async (req, res) => {
    try {
        const user = await userRepo.get(req.body);
        if (user) {
            // verify password
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                const token = jwt.sign({ email: user.email, role: user.role }, config.jwtSecret, {
                    expiresIn: '1d'
                });
                res.status(200).json({ token: token });
            } else {
                res.status(401).send('Unauthorized');
            }
        }
        else res.status(401).send('Email or password is wrong');
    } catch (err) {
        res.status(500).send('Internal server errror');
    }
};

module.exports = {
    signup,
    signin
};

// authentication 
// authorization (privilages)
// permissions
// canDelete, canEdit, canView
