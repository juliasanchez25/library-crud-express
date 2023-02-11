const authorData = require('../data/authors.json')
const { writeInDatabase } = require('../utils/database-utils')
const _ = require('lodash')

class AuthorController {
  static getOneOrManyAuthors (req, res) {
    const authorId = req?.body?.authorId
    if (authorId) {
      return res.send(this._getOneAuthor(authorId)) // caso seja enviado o authorId, cairá nessa função e pegará um só
    }

    return res.json(authorData)
  }

  static createAuthor (req, res) {
    const { name } = req.body

    const newAuthor = {
      id: `${authorData?.length + 1}`,
      name
    }

    authorData.push(newAuthor)
    writeInDatabase(authorData, 'authors')
    return res.send(authorData)
  }

  static updateAuthor (req, res) {
    const { authorId, name } = req?.body

    const authorDataUpdated = authorData.map((author) => {
      if (author.id !== authorId) { return author }

      return { id: author.id, name: name || author.name }
    })

    writeInDatabase(authorDataUpdated, 'authors')
    return res.send(authorDataUpdated)
  }

  static deleteAuthor (req, res) {
    const { authorId } = req?.body

    const authors = _.reject(authorData, (author) => author.id === authorId)
    writeInDatabase(authors, 'authors')
    return res.send(authors)
  }

  static _getOneAuthor (bookId) {
    const book = _.find(authorData, (book) => book.id === bookId)
    return book
  }
}

module.exports = AuthorController
