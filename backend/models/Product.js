const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    available: Boolean,
});

module.exports = mongoose.model('Product', ProductSchema);
