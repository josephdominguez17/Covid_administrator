const mongoose = require('mongoose');

let memberScheme = new mongoose.Schema({
    nameAppointment : String,
    ageAppointment : String,
    numberAppointment : String,
    timeAppointment : String,
    clinicAppointment : String,


});

module.exports = mongoose.model('Member', memberScheme);
