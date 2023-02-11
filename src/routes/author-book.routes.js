const express = require('express')
const jsonParser = require('../constants/json-parse')
const AuthorBookController = require('../controllers/AuthorBook')
const authorBook = express.Router()

authorBook.route('/author-book')
  .post(jsonParser, (req, res) => AuthorBookController.createBookWithAuthor(req, res))
  .delete(jsonParser, (req, res) => AuthorBookController.deleteAuthorFromBook(req, res))

module.exports = authorBook
