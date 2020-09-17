const express = require('express');
const Users = require('./users');
const Auth = require('./auth');
const Appointment = require('./appointment')
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/user', Users);
    app.use('/api/auth', Auth);
    app.use('/api/appointment', Appointment);
};
