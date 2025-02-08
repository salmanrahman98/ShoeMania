const mongoose = require("mongoose");

// Custom validator function to check if the array contains valid items
const validateItems = function (value) {
    // Check if value is an array and it contains at least one item
    if (!Array.isArray(value) || value.length === 0) {
        return false;
    }

    
    // Check if each item has a productId (string) and a quantity (number) >= 1
    return value.every(item => {
        return typeof item.productId === 'string' && typeof item.quantity === 'number' && item.quantity >= 1;
    });
};

const ordersSchema = new mongoose.Schema({
    items: {
        type: [
            {
                productId: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true,
        validate: [validateItems, 'Items array must contain at least one valid item with productId and quantity >= 1 and only']
    },
    total: {
        type: Number,
        required: true
    },
    orderById: {
        type: String,
        required: false
    },
    customerName: { 
        type: String,
        required: false
    },
    paymentStatus: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        default: "Placed"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Orders", ordersSchema);
