const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/ripple');

module.exports = connection;