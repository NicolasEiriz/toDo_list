//Connection to my Mongo Database

const mongoose = require('mongoose')

//ConnectDB here exports a function

const connectDB = async () =>{
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB