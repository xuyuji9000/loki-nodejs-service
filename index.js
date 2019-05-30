const express = require('express')
const app = express()
const axios = require('axios')
const port = 3001
const loki_url = 'http://localhost:3100/api/prom/push'
const host = 'somehost'

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/loki', (req, res) => {
  headers = {
    'Content-type': 'application/json'
  }
  payload = {
    'streams': [
      {
        'labels': '{source=\"nodejs\"}',
        'entries': [
          {
            'ts': new Date(),
            'line': 'This is a warning.'
          }
        ]
      }
    ]
  }
  axios.post(loki_url, payload, {headers : headers}).then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
