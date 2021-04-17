const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    productId: {
        type: String,
        required: false,
    },
    productName: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false,
        min: [0, 'Quantity can not be less then 0.']
    },
    amount: {
        type: Number,
        required: false
    }
});

const UserCartSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique:true,
        dropDups:true
    },
    cart: {
        type : [Item],
        required : true
    }
})
module.exports = mongoose.model('UserCart', UserCartSchema);