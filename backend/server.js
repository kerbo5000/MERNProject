const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3500
const path = require('path')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')
const verifyRoles = require('./middleware/verifyRoles')
const ROLES_LIST = require('./config/roles_list')
const credentials = require('./middleware/credentials')
const moogoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cookieParser = require('cookie-parser')
connectDB()

const app = express()
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))

// app.use(verifyJWT)
app.use('/employees',verifyJWT,require('./routes/api/employees'))
app.use('/news',verifyJWT,require('./routes/api/news'))
app.use('/users',verifyJWT,require('./routes/api/users'))

if(process.env.NODE_ENV == 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}else{
  app.get('/', (req,res) => res.send('Please set to production') )
}

// app.all('*',(req,res) => {
//   res.status(404)
//   res.json({error:"404 not found"})
// })

app.use(errorHandler)
moogoose.connection.once('open',() => {
  console.log('Connected to MongoDB')
  app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
})
