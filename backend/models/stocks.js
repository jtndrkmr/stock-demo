const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    Date: {type: Date, default: new Date()},
    Open: Number,
    Close: Number
});

module.exports = mongoose.model('stocks', stockSchema);