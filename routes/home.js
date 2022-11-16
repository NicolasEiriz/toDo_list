
const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex) //here this file see the route '/', and  tells what controller will be handle this request 

module.exports = router