const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3500
const path = require('path')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const app = express()
app.use(logger)

app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/employees',require('./routes/api/employees'))

app.all('*',(req,res) => {
  res.status(400)
  res.json({error:"404 not found"})
})

app.use(errorHandler)

app.listen(PORT,() => console.log(`Server runnig on port ${PORT}`))
