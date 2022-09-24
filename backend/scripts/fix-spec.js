const fs = require('fs')

try {
  let data = fs.readFileSync('./src/swagger/swagger.json', 'utf8')
  data = data.replaceAll('https://localhost:3001', 'http://localhost:3001')
  fs.writeFileSync('./src/swagger/swagger.json', data)
  console.log('\\fix spec completed successfully!')
} catch (err) {
  console.log(err)
}
