const mongoose = require('mongoose');
const loanSchema = new mongoose.Schema({
  code:{
    type: String,
    required: true
  },
    persontype:{
      type: String,
      required: true
    },
    identitynumber: {
        type: String,
        required: true
      },
    debtor: {
        type: String,
        required: true
      },
    money:{
      type: Number,
      required:true,
    },
    expire:{
      type: Date,
      required:true,
    },
    status:{
      type: String,
      required:true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = {loanSchema}