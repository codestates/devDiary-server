const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');

//GET question/:id
router.get('/:id', questionController.getPost);

//GET question
router.get('/', questionController.getPostlist);

//POST question/newPost
router.post('/newPost', questionController.newPost);

//POST question/updatePost
router.post('/updatePost', questionController.updatePost);

//POST question/id/newComment
router.post("/:id/newComment", questionController.newComment);

//POST question/deletePost
router.post('/deletePost', questionController.deletePost);

module.exports = router;
