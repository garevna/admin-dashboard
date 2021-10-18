const express = require('express')
const path = require('path')

// optional: allow environment to specify port
const port = process.env.PORT || 8080

// create server instance
const app = express()
// bind the request to an absolute path or relative to the CWD
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(__dirname, '/dist/index.html')
})

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`))
