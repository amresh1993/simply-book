const router = require('express').Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/users');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
    );
    if (!validPassword) return res.status(400).send('Invalid email or password');
    const token = user.genAuthToken();
    let { username, firstname, email, isAdmin, _id, gender, age } = user
    // if (user.isAdmin) return res.header('x-auth-token', token).send({ username, firstname, email, isAdmin, _id });
    res.header('x-auth-token', token).send({ username, firstname, email, _id, gender, isAdmin, age });
});

function validate(auth) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(auth, schema);
}

module.exports = router;
