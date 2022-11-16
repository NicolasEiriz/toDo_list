const express = require('express') //requires express thanks to node
const app = express() //don't know -> Calls the express function in these code
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/', homeRoutes)
app.use('/todos', todoRoutes)

app.listen(process.env.PORT, ()=> {
  console.log('Server is running!');
})
