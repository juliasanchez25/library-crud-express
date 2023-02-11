const app = require('./routes/_index')

app.listen(3000, () => {
  console.log('Server connected!')
})

module.exports = app
