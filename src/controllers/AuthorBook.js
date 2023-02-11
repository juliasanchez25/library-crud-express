const bookData = require('../data/books.json')
const authorData = require('../data/authors.json')
const { writeInDatabase } = require('../utils/database-utils')

class AuthorBookController {
  static createBookWithAuthor (req, res) {
    const { bookId, authorId } = req.body
    const author = authorData.find((author) => {
      return author.id === authorId
    })

    const book = bookData.find((book) => {
      return book.id === bookId
    })

    const newBookWithAuthor = { ...book, author }
    bookData.push(newBookWithAuthor)
    writeInDatabase(bookData, 'books')
    return res.send(newBookWithAuthor)
  }

  static deleteAuthorFromBook (req, res) {
    const { bookId } = req.body
    const book = bookData.map((book) => {
      if (book.id !== bookId) { return book }

      delete book.author
      return book
    })

    writeInDatabase(book, 'books')
    return res.send(book)
  }
}

module.exports = AuthorBookController
