const express = require('express');
const router = express.Router();

const diaryController = require('../controllers/diaryController');

//GET diary/:id
router.get('/:id', diaryController.getPost);

//GET diary
router.get('/', diaryController.getPostlist);

//POST diary/newPost
router.post('/newPost', diaryController.newPost);

//POST diary/id/updatePost
router.post('/:id/updatePost', diaryController.updatePost);

//POST diary/id/newComment
router.post("/:id/newComment", diaryController.newComment);

//POST diary/id/deletePost
router.post('/:id/deletePost', diaryController.deletePost);

//POST diary/id/postLike
router.post('/:id/likePost', diaryController.postLike);

module.exports = router;
