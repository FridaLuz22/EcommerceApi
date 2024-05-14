const mongoose = require('mongoose');
const { ventaSchema } = require('./schemas');

const ventaModel = mongoose.model('venta', ventaSchema);

module.exports = {ventaModel };