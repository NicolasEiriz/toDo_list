//The job of the router is figure out which controller is going to handle a request from the user(client)

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex) //here this file see the request on the main route ('/', the home page), and  tells what controller will be handle this request 

module.exports = router