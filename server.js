const express = require('express')
const path = require('path')
const winston = require('winston')
const expressWinston = require('express-winston')
// optional: allow environment to specify port
const port = process.env.PORT || 8080

// create server instance
const app = express()
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false }
}))

app.get('*', (req, res) => {
  const options = {
    root: path.join(__dirname, 'dist'),
    dotfiles: 'deny'
  }

  res.sendFile('index.html', options, function (err) {
    if (err) {
      res.status(err.status).end()
    }
  })
})

app.use(express.static(path.join(__dirname, 'dist')))

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`))
