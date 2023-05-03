const express = require("express");
const router = express.Router();
const {verifyUser} = require("../utils/verifytoken")
const {postQuerry,getRequests} = require('../controllers/queries')

router.post('/requestproperty',postQuerry);
router.get('/requestproperty',getRequests)


module.exports = router