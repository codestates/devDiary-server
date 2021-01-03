const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');

//GET question/:id
router.get('/:id', questionController.getPost);

//GET question
router.get('/', questionController.getPostlist);

//POST question/newPost
router.post('/newPost', questionController.newPost);

//POST question/id/newComment
router.post("/:id/newComment", questionController.newComment);

//POST question/id/postLike
router.post('/:id/likePost', questionController.postLike);

//POST question/id/updatePost
router.post('/:id/updatePost', questionController.updatePost);

//POST question/id/deletePost
router.post('/:id/deletePost', questionController.deletePost);

module.exports = router;
