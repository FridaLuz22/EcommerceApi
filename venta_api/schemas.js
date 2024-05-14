const mongoose = require('mongoose');
const ventaSchema = new mongoose.Schema({
  idProducto: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  });

  ventaSchema.pre('save', function(next) {
    this.total = this.cantidad * this.precio;
    next();
  });

  module.exports = {ventaSchema}