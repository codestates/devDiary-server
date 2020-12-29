const express = require('express');
const router = express.Router();

const diaryController = require('../controllers/diaryController');

//POST diary/newPost
router.post('/newPost', diaryController.newPost);

//POST diary/updatePost
router.post('/updatePost', diaryController.updatePost);

module.exports = router;