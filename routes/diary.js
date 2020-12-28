const express = require('express');
const router = express.Router();

const diaryController = require('../controllers/diaryController');

//GET diary
router.get('/', diaryController.getPostlist);


module.exports = router; 