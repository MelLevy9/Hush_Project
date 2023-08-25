const express = require('express');
const router = express.Router();

const { getAllPosts, getPostById, createPost, updatePost, deletePost, searchPosts, getMyPostList } = require('../controllers/postController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/search', searchPosts);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/user/:userId', authenticateUser, authorizeUser(['user','admin']), getMyPostList);
router.post('/', authenticateUser, authorizeUser(['user','admin']), createPost);
router.put('/:id', authenticateUser, authorizeUser(['admin']), updatePost);
router.delete('/:id', authenticateUser, authorizeUser(['admin']), deletePost);

module.exports = router;