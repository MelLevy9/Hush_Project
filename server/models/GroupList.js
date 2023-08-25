const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const groupListSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {
    type: ObjectId,
    ref: 'Group',
    required: true,
  }
});

const GroupList = mongoose.model('GroupList', groupListSchema);

module.exports = GroupList;