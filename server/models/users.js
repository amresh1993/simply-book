const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 5,
            maxlength: 55,
            unique: true,
            required: true,
        },
        firstname: {
            type: String,
            minlength: 5,
            maxlength: 255,
            required: true,
        },
        lastname: {
            type: String,
            minlength: 5,
            maxlength: 255,
        },
        email: {
            type: String,
            minlength: 5,
            maxlength: 255,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            minlength: 5,
            maxlength: 1024,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        age: Number,
        specialization: String,
        address: String,
        gender: String
    },
    { timestamps: true },
);
userSchema.methods.genAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get('jwtPrivateKey'),
    );
    return token;
};
const User = mongoose.model('users', userSchema);

const validateUser = (user) => {
    const schema = {
        username: Joi.string().min(5).max(55).required(),
        firstname: Joi.string().min(5).max(255).required(),
        lastname: Joi.string().min(5).max(255),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
        gender: Joi.string().required(),
        isAdmin: Joi.boolean(),
        address: Joi.string(),
        age: Joi.number(),
        specialization: Joi.string()
    };

    return Joi.validate(user, schema);
};

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
