const booksRouter = require('./books.routes')
const authorsRouter = require('./authors.routes')
const authorBookRouter = require('./author-book.routes')
const express = require('express')
const app = express()

app.use('/', booksRouter)
app.use('/', authorsRouter)
app.use('/', authorBookRouter)

module.exports = app
