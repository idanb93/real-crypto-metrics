const fs = require('fs')

try {
  const data = fs.readFileSync(
    'C:\\Users\\Idan\\RealCryptoMetrics\\backend\\src\\swagger\\swagger.json',
    'utf8'
  )
  fs.writeFileSync('./src/swagger/swagger.json', data)
  console.log('\ncopied spec file from local backend completed successfully!')
} catch (err) {
  console.error(err)
}
