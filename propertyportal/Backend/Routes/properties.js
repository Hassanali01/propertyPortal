const express = require('express');
const router = express.Router();
const Properties = require("../Models/properties");

const {postproperty,getProperty,editProperty,deleteProperty,admin, paginatedResults,searchResults} = require('../controllers/properties')
const {verifyUser,verifyAdmin} = require("../utils/verifytoken")

//create property
router.post('/addproperty',verifyUser,postproperty);
//getting property with owner information



// router.get('/',getProperty)
// router.get("/", paginatedResults(Properties), getProperty);
router.get("/",verifyUser, getProperty);

//update property
router.put('/:id',verifyUser,editProperty)
//delete property
router.delete('/:id',verifyUser,deleteProperty)


router.get('/filterproperties',searchResults)

module.exports = router;