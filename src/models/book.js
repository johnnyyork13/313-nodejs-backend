const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    isbn: { type: String, required: true },
    title: { type: String, required: true },
    author: [],
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    added: { type: String, required: true }
})

module.exports = mongoose.model("Book", BookSchema);