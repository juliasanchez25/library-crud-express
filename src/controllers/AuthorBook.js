const bookData = require('../data/books.json')
const authorData = require('../data/authors.json')
const { writeInDatabase } = require('../utils/database-utils')

class AuthorBookController {
  static createBookWithAuthor (req, res) {
    const { bookId, authorId } = req.body
    // find: busca os dados do autor e do livro a partir do json
    const author = authorData.find((author) => {
      return author.id === authorId
      // pegar um só id de todos os autores
    })

    // percorre o json e o que tiver vai para a variável book
    const book = bookData.find((book) => {
      return book.id === bookId
    })

    // ...book: passar propriedades de book para newBookWithAuthor
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
