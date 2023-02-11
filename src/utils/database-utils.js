const fs = require('fs')
const path = require('path')

function writeInDatabase (data, database) {
  fs.writeFile(
    path.join(__dirname, `../data/${database}.json`),
    JSON.stringify(data),
    (error) => console.error(error)
  )
}

module.exports = {
  writeInDatabase
}
