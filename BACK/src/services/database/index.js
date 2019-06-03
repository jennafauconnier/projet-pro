const mongoose = require('mongoose')

const connect = (config) => {  
  mongoose.connection.on('connected', function(){
    console.log('mongodb connection OK!');
  });
  mongoose.connection.on('error', function(){
    console.log('mongodb error while connecting');
  });
  mongoose.connection.on('disconnected', function(){
    console.log('mongodb disconnected');
  });
  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`, { useNewUrlParser: true });
};

module.exports = {
  connect
}