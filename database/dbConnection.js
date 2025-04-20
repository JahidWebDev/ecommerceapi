const mongoose = require('mongoose');

function dbConnection() {
    mongoose.connect(`${process.env.DB_URL}`, {
        
    })
    .then(() => console.log('DataBase connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = dbConnection;
