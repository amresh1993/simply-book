const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/users');
const { validateId } = require('../models/appointment');
const auth = require('../middlewares/auth')

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User Already registered.');
    const {
        username,
        firstname,
        lastname,
        email,
        password,
        isAdmin,
        address,
        age,
        specialization,
        gender
    } = req.body;
    if (req.body.isAdmin) {
        user = new User({
            username,
            firstname,
            lastname,
            email,
            password,
            isAdmin,
            address,
            age,
            specialization,
            gender
        });
    } else {
        user = new User({
            username,
            firstname,
            lastname,
            email,
            password,
            isAdmin,
            age,
            gender
        });
    }


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send('Account created successfully.');
});


router.get('/list', auth, async (req, res) => {
    const { error } = validateId({ id: req.user._id });
    if (error) return res.status(400).send(error.details[0].message);
    if (req.user.isAdmin) return res.status(403).send('Access Denied.')
    const list = await User.find({ isAdmin: true }).select('-isAdmin -email -password -createdAt -updatedAt -dob -__v')
    res.send(list)
})

module.exports = router;
