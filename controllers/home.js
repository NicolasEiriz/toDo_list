//this home controller it make and object with a method (getIndex)

module.exports = {
  getIndex: (req,res)=>{
    res.render('index.ejs')
  }
} //this method will render my index.ejs page