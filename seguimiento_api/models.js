const mongoose = require('mongoose');
const { seguimientoSchema } = require('./schemas');

const seguimientoModel = mongoose.model('seguimiento', seguimientoSchema);

module.exports = {seguimientoModel };