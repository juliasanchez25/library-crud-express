const bookData = require('../data/books.json')
const _ = require('lodash')
const { writeInDatabase } = require('../utils/database-utils')

class BookController {
  static getOneOrManyBooks (req, res) {
    const bookId = req?.body?.bookId
    if (bookId) {
      return res.send(this._getOneBook(bookId)) // caso seja enviado o bookId, cairá nessa função e pegará um só
    }

    return res.json(bookData)
  }

  static createBook (req, res) {
    const { title, genre } = req.body

    const newBook = {
      id: `${bookData.length + 1}`,
      title,
      genre
    }

    bookData.push(newBook)
    writeInDatabase(bookData, 'books')
    return res.json(bookData)
  }

  static updateBook (req, res) {
    const response = req.body

    const bookDataUpdated = bookData.map((book) => {
      if (book.id !== response.bookId) { return book }
      return {
        id: book.id,
        title: response?.title || book.title,
        genre: response?.genre || book.genre
      }
    })

    writeInDatabase(bookDataUpdated, 'books')
    return res.json(bookDataUpdated)
  }

  static deleteBook (req, res) {
    const { bookId } = req?.body

    if (!bookId || bookId <= 0) { throw new Error('Book id is invalid') }

    const books = _.reject(bookData, (book) => book.id === bookId)

    writeInDatabase(books, 'books')
    return res.json(books)
  }

  // função privada
  static _getOneBook (bookId) {
    const book = _.find(bookData, (book) => book.id === bookId)
    return book
  }
}

module.exports = BookController
