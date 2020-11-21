const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create bill Schema and model
const StockSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0.0
    }
});

const Stock = mongoose.model('stock', StockSchema);

module.exports = Stock;