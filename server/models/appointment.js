const mongoose = require('mongoose');
const Joi = require('joi');
const Appointment = mongoose.model(
    'appointment',
    new mongoose.Schema({
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        patientInfo: {
            firstname: {
                type: String,
                required: true,
            },
            lastname: String,
            gender: String,
            age: Number

        },
        reason: {
            type: String,
            required: true,
        },
        day: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        doctorInfo: {
            firstname: {
                type: String,
                required: true,
            },
            lastname: String,
            address: {
                type: String,
                required: true
            },
            specialization: String
        },
        status: {
            requested: Boolean,
            reject: Boolean,
            confirmed: Boolean,
        },
        visit: String
    }),
);

const validateAppointment = (appointment) => {
    const schema = {
        doctorId: Joi.objectId().required(),
        reason: Joi.string().required(),
        status: Joi.object({
            requested: Joi.boolean().required(),
            reject: Joi.boolean().required(),
            confirmed: Joi.boolean().required(),
        }).required(),
        day: Joi.date().required(),
        time: Joi.string().required(),
        visit: Joi.string()
    };

    return Joi.validate(appointment, schema);
};
const validatePut = (Appointment) => {
    const schema = {
        status: Joi.object({
            requested: Joi.boolean().required(),
            reject: Joi.boolean().required(),
            confirmed: Joi.boolean().required(),
        }).required(),
    };

    return Joi.validate(Appointment, schema);
};

const validateId = (id) => {
    const schema = {
        id: Joi.objectId().required(),
    };
    return Joi.validate(id, schema);
};

exports.Appointment = Appointment;
exports.validateAppointment = validateAppointment;
exports.validateId = validateId
exports.validatePut = validatePut