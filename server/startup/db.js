const mongoose = require('mongoose');

module.exports = function () {
    mongoose
        .connect('mongodb://localhost:27017/simply-book', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log('connected to db'));
};
