const BookSchema = require('../models/book');

//books/all/glance
exports.get_all_books_glance = async(req, res, next) => {
    try {
        const bookList = await BookSchema.find({}).limit(12).exec();
        res.json({bookList: bookList});
    } catch(err) {
        next(err, null);
    }
}

//books/all/my-books
exports.get_all_books_my_books = async(req, res, next) => {
    try {
        const bookList = await BookSchema.find({}).exec();
        res.json({bookList: bookList});
    } catch(err) {
        next(err, null);
    }
}

exports.get_recent_books = async(req, res, next) => {
    try {
        const bookList = await BookSchema.find({}).sort({date: -1}).limit(10).exec()
        res.json({bookList: bookList});
    } catch(err) {
        next(err, null);
    }
}

exports.get_book_by_id = async(req, res, next) => {
    try {
        const book = await BookSchema.findOne({_id: req.params.id}).exec();
        res.json({book: book});
    } catch(err) {  
        console.log(err);
    }
}

//books/filter
exports.post_by_filter = async(req, res, next) => {
    try {
        const bookList = await BookSchema.find({[req.body.filter]: req.body.keywords}).exec();
        res.json({bookList: bookList});
    } catch(err) {
        next(err, null);
    }
}

//books/add
exports.post_add_book = async(req, res, next) => {
    try {
        const authors = req.body.author.split(",");
        const book = new BookSchema({
            isbn: req.body.isbn,
            title: req.body.title,
            author: authors,
            publisher: req.body.publisher,
            year: Number(req.body.year),
            added: new Date(),
        })
        await book.save();
        res.json({book: book});
    } catch(err) {
        console.log(err);
        next(err, null);
    }
}

exports.get_delete_book = async(req, res, next) => {
    try {
        await BookSchema.deleteOne({_id: req.params.id}).exec();
        res.json({message: "success"});
    } catch(err) {
        next(err, null);
    }
}
