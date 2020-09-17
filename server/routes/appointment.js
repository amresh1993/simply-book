const router = require('express').Router();
const { User } = require('../models/users')
const { Appointment, validateAppointment, validateId, validatePut } = require('../models/appointment')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');


router.get('/', auth, async (req, res) => {
    let appointment
    if (req.user.isAdmin) {
        appointment = await Appointment.find({ doctorId: req.user._id })
    } else {
        appointment = await Appointment.find({ patientId: req.user._id })
    }
    res.send(appointment)
})

router.get('/:id', auth, async (req, res) => {
    const { error } = validateId({ id: req.params.id });
    if (error) return res.status(400).send(error.details[0].message);
    const appointment = await Appointment.findById(req.params.id)
    res.send(appointment);
});

router.post('/', auth, async (req, res) => {
    const errorId = validateId({ id: req.user._id });
    if (errorId.error && errorId.error.isJoi) return res.status(400).send(errorId.error.details[0].message);
    const { error } = validateAppointment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let patient = await User.findById(req.user._id)
    let doctor = await User.findById(req.body.doctorId)
    let { reason, status, day,time, visit } = req.body
    let appointment = new Appointment({
        patientId: patient._id,
        patientInfo: {
            firstname: patient.firstname,
            lastname: patient.lastname,
            gender: patient.gender,
            age: patient.age
        },
        doctorId: doctor._id,
        doctorInfo: {
            firstname: doctor.firstname,
            lastname: doctor.lastname,
            address: doctor.address,
            specialization: doctor.specialization
        },
        reason,
        status,
        day,
        time,
        visit
    })
    await appointment.save();
    res.send('Appointment created successfully.')
});

router.put('/:appointmentId', [auth, admin], async (req, res) => {
    const errorId = validateId({ id: req.params.appointmentId });
    if (errorId.error && errorId.error.isJoi) return res.status(400).send(errorId.error.details[0].message);
    const { error } = validatePut(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let appointment = await Appointment.findById(req.params.appointmentId)
    let doctor = await User.findById(req.user._id)
    if (JSON.stringify(appointment.doctorId) !== JSON.stringify(doctor._id)) return res.status(403).send('Access Denied.')
    let { status } = req.body
    status.requested = false
    await Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, { status })
    for (const key in status) {
        if (status[key]) return res.send(`Appointment ${key}`);
    }
})

router.delete('/:appointmentId', auth, async (req, res) => {
    const { error } = validateId({ id: req.params.appointmentId });
    if (error) return res.status(400).send(error.details[0].message);
    let patient = await User.findById(req.user._id)
    if (!patient) return res.status(400).send('Bad request.');
    let appointment = await Appointment.findById(req.params.appointmentId)
    if (!appointment) return res.status(400).send('Bad request.');
    if (JSON.stringify(appointment.patientId) !== JSON.stringify(patient._id)) return res.status(403).send('Access Denied.')
    appointment.deleteOne({ _id: req.params.appointmentId });
    res.send('Appointment deleted successfully.')
})




module.exports = router;
