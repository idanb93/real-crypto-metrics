const axios = require('axios')
const data = JSON.stringify({
  owner: 'solana-labs',
  repo: 'solana'
})

const config = {
  method: 'post',
  url: 'http://localhost:3001/api/github/contributors',
  headers: {
    'Content-Type': 'application/json'
  },
  data
}

;(async () => {
  let success = 0
  const failed = 0
  const promises = []

  for (let i = 0; i < 1000; i++) {
    console.log(i)
    promises.push(axios(config).then(() => success++))
  }

  await Promise.all(promises)

  console.log(success)
  console.log(failed)
})()
