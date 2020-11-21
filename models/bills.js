const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create bill Schema and model
const BillSchema = new Schema({
    cust_name: {
        type: String,
        required: [true, 'Name field is required']
    },
    products: {
        type: Array,
        items: {
            type: Object,
            properties: {
                name: {
                    type: String,
                },
                quantity: {
                    type: Number
                }
            }
        }
    },
    amount: {
        type: Number,
        default: 0
    }
});

const Bill = mongoose.model('bill', BillSchema);

module.exports = Bill;