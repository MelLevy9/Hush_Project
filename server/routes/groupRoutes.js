const express = require('express');
const router = express.Router();

const { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup, getGroupPostsById } = require('../controllers/groupController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.get('/posts/:id', getGroupPostsById);
router.post('/', authenticateUser, authorizeUser(['admin']), createGroup);
router.put('/:id', authenticateUser, authorizeUser(['admin']), updateGroup);
router.delete('/:id', authenticateUser, authorizeUser(['admin']), deleteGroup);


module.exports = router;