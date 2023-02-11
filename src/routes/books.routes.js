const express = require('express')
const BookController = require('../controllers/Book')
const jsonParser = require('../constants/json-parse')
const booksRouter = express.Router()

booksRouter.route('/book')
  .get(jsonParser, (req, res) => BookController.getOneOrManyBooks(req, res))
  .post(jsonParser, (req, res) => BookController.createBook(req, res))
  .put(jsonParser, (req, res) => BookController.updateBook(req, res))
  .delete(jsonParser, (req, res) => BookController.deleteBook(req, res))

module.exports = booksRouter
