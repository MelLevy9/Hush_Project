const express = require('express');
const router = express.Router();

const { getMyGroupList, addGroupToList, deleteGroupFromList } = require('../controllers/groupListController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/:id', authenticateUser, authorizeUser(['user']), getMyGroupList);
router.post('/', authenticateUser, authorizeUser(['user']), addGroupToList);
router.delete('/:id', authenticateUser, authorizeUser(['user']), deleteGroupFromList);

module.exports = router;