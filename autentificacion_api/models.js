const mongoose = require('mongoose');
const { loginSchema } = require('./schemas');

const loginModel = mongoose.model('login', loginSchema);

module.exports = {loginModel };