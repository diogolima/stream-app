const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())

// require('./routes/Video')(app)


const Videos = require('./routes/Video')
app.use('/videos', Videos)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})