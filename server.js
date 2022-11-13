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

  app.get('/', async (request, response)=>{
    const todoItems = await db.collection('todo_list').find().toArray()
    const itemsLeft = await db.collection('todo_list').countDocuments({completed: false})
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
  })  


  app.post('/addTodo', (request, response) =>{
    db.collection('todo_list').insertOne({thingToDo: request.body.todoItem, completed: false})
    .then(result =>{
      console.log('Item Added!')
      response.redirect('/')
    })
    .catch(error => console.error(error))
  })

  app.put('/markComplete', (request, response)=>{
    db.collection('todo_list').updateOne({thingToDo: request.body.itemFromJS}, {
      $set: {
        completed: true
      }
    },{
      sort: {_id: -1},
      upsert: false
    })
    .then(result =>{
      console.log('Item completed')
      response.json('Item completed')
    })
    .catch(error => console.error(error))
  })

  app.put('/markUnComplete', (request, response)=>{
    db.collection('todo_list').updateOne({thingToDo: request.body.itemFromJS}, {
      $set: {
        completed: false
      }
    },{
      sort: {_id: -1},
      upsert: false
    })
    .then(result =>{
      console.log('Mark uncompleted')
      response.json('Mark uncompleted')
    })
    .catch(error=> console.error(error))
  })

  app.put('/undo', (request, response)=>{
    db.collection('todo_list').updateOne({thingToDo: request.body.itemFromJS},{
      $set:{
        completed: false
      }
    })
    .then(result=>{
      console.log('Marked uncompleted')
      response.json('Marked uncompleted')
    })
    .catch(error=> console.error(error))
  })

app.delete('/deleteItem', (request, response)=>{
  db.collection('todo_list').deleteOne({thingToDo: request.body.itemFromJS})
  .then(result =>{
    console.log('Deleted')
    response.json('Deleted')
  })
  .catch(error=> console.error(error))
})


  app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
  })

  /*Need to resolve the input item in the html*/