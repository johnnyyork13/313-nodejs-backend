const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

//get requests for books
router.get('/books/all', bookController.get_all_books);
router.get('/books/recent', bookController.get_recent_books);
router.get('/books/get/:id', bookController.get_book_by_id);
router.get('/book/delete/:id', bookController.get_delete_book);

//post requests
router.post('/book/add', bookController.post_add_book);
router.post('/books/filter', bookController.post_by_filter);

module.exports = router;