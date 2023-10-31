const userRepo = require('../repositories/userRepo');

const hasValidationError = (err) => err.message
    && err.message.indexOf('users validation failed') > -1;

const hasConflict = (err) => err.message
    && err.message.indexOf('duplicate key error');

const signup = async (req, res) => {
    try {
        req.body.createdDate = new Date();
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

module.exports = {
    signup
};