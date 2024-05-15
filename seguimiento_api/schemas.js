const mongoose = require('mongoose');
const seguimientoSchema = new mongoose.Schema({
  idVenta:{
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

  module.exports = {seguimientoSchema}