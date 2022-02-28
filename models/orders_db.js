const mongoose = require('mongoose');

OrderSchema = mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        }
    }],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String, default: "COD"
    },
    paymentResult: {
        paymentId: { type: String },
        status: { type: String },
        email_address: { type: String },
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

Order = mongoose.model('Orders', OrderSchema);
module.exports = Order;