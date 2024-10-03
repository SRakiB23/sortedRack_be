const mongoose = require('mongoose');

const connDb = (url) => {
    // Set strictQuery to true or false based on your preference
    mongoose.set('strictQuery', true); // or false based on your needs
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connDb;
