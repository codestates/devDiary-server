const express = require('express');
const router = express.Router();

const diaryController = require('../controllers/diaryController');

//GET diary/:id
router.get('/:id', diaryController.getPost);

//GET diary
router.get('/', diaryController.getPostlist);

//POST diary/newPost
router.post('/newPost', diaryController.newPost);

//POST diary/updatePost
router.post('/updatePost', diaryController.updatePost);

//POST diary/deletePost
router.post('/deletePost', diaryController.deletePost);

module.exports = router;
