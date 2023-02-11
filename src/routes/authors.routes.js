const express = require('express')
const AuthorController = require('../controllers/Author')
const jsonParser = require('../constants/json-parse')
const authorsRouter = express.Router()

authorsRouter.route('/author')
  .get(jsonParser, (req, res) => AuthorController.getOneOrManyAuthors(req, res))
  .post(jsonParser, (req, res) => AuthorController.createAuthor(req, res))
  .put(jsonParser, (req, res) => AuthorController.updateAuthor(req, res))
  .delete(jsonParser, (req, res) => AuthorController.deleteAuthor(req, res))

module.exports = authorsRouter
