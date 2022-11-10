const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

let db,
dbConnectionStr = process.env.DB_STRING,
dbName = 'toDo'


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
  .then(client =>{
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
  })

  app.set('view engine', 'ejs')
  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true}))
  app.use(express.json())

  app.get('/', (request, response)=>{
    db.collection('todo_list').find().sort({check: -1}).toArray()
    .then(data =>{
      response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
  })

  app.post('/addItem', (request, response) =>{
    db.collection('todo_list').insertOne({itemName: request.body.itemNameS, itemTime: request.body.itemTimeS, check: 0})
    .then(result =>{
      console.log('Item Added!')
      response.redirect('/')
    })
    .catch(error => console.error(error))
  })

  app.put('/checkItem', (request, response)=>{
    db.collection('todo_list').updateOne({itemName: request.body.itemNameS, itemTime: request.body.itemTimeS, check: request.body.itemCheckS}, {
      $set: {
        check:request.body.itemCheckS + 1
      }
    },{
      sort: {_id: -1},
      upsert: true
    })
    .then(result =>{
      console.log('Item checked')
      response.json('Item done')
    })
    .catch(error => console.error(error))
  })

  app.delete('/deleteItem', (request, response)=>{
    db.collection('todo_list').deleteOne({itemName: request.body.itemNameS})
    .then(result =>{
      console.log('Item deleted')
      response.json('Item deleted')
    })
    .catch(error=> console.error(error))
  })

  app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
  })

  /*Need to resolve the input item in the html*/