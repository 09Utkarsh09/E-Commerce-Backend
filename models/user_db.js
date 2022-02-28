const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isSeller: { type: Boolean, required: true, default: false },
    /*seller: {
        //name: String
        rating: { type: Number, required: true, default: 0 },
        num_of_reviews: { type: Number, required: true, default: 0 }
    }*/
}, {
    timestamps: true
});

Users = mongoose.model("User_table", userSchema);
module.exports = Users;