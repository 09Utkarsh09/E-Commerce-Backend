const mongoose = require('mongoose');

const MONGOURI = 'mongodb://localhost:27017/ECommerceDB';

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("CONNECTED to DB!!!!!");
    } catch (e) {
        console.log(e);
        throw (e);
    }
};

module.exports = InitiateMongoServer;