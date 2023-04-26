const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialmediabackend', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;