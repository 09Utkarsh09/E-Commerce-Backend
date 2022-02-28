const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {type: String, required:true},
    comment:{type: String, required:true},
    rating:{type:Number, required:true}
},{
    timestamps: true
});

const ProductSchema =new mongoose.Schema({
    name: { type: String, required: true },
    brand:{ type: String, required:true},
    category: { type: String, required: true },
    description: {type: String, default:"THIS VALUE INCLUDES DESCRIPTION OF THE PRODUCT"},
    price: { type: Number, required: true },
    stockCount: {type:Number,required:true},
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    ratings:{type: Number, required:true},
    reviews: [ReviewSchema]
}, {
    timestamps: true
});

Products = mongoose.model("Products_Table", ProductSchema);
module.exports = Products;