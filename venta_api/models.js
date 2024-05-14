const mongoose = require('mongoose');
const { loanSchema } = require('./schemas');

const loanModel = mongoose.model('Loan', loanSchema);

module.exports = {loanModel };