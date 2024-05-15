const mongoose = require('mongoose');
const ventaSchema = new mongoose.Schema({
  idVenta:{
    type: String,
    required: true
  },
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
  status:{
    type: String,
    required: true
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