const Joi = require('joi');
const GroupList = require('../models/GroupList');

const mongoose = require('mongoose');
const Group = require('../models/Group');
const { ObjectId } = mongoose.Types;


const getMyGroupList = async (req, res, next) => {
  
  const { id } = req.user;

  const groupList = await GroupList.find({userId: new ObjectId(id)});

  if (!groupList.length) {
    return res.status(404).json({ error: 'Could not find a group list for this user' });
  }

  return res.status(200).json({ data: groupList });

}


const addGroupToList = async (req, res, next) => {

  const { userId, groupId } = req.body;

  const schema = Joi.object({
    userId: Joi.string().required(),
    groupId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if(error) {
    return res.status(400).json({ error: error.details[0].message });
  };

  try {

    const foundGroup = await Group.find({groupId});
    if (!foundGroup) {
      return res.status(400).json({ error: 'This group does not exists in database' });
    };

    const groupAlreadyInUserList = await GroupList.find({userId: new ObjectId(userId), groupId: new ObjectId(groupId)});

    if (groupAlreadyInUserList.length) {
      return res.status(401).json({ error: 'This group is already in your list' });
    };

    const addedGroup = await GroupList.create({
      userId,
      groupId
    });

    return res.status(200).json({ created: addedGroup });
    
  } catch (error) {
    next(error);
  }


}


const deleteGroupFromList = async (req, res, next) => {

  const { id } = req.params;

  try {

    const deletedGroup = await GroupList.findByIdAndRemove(id);
    if(!deletedGroup) {
      return res.status(404).json({ error: 'This object id does not exist' });
    }
  
    return res.status(200).json({ deleted: deletedGroup });

  } catch(error) {
    next(error);
  }

}

module.exports = { getMyGroupList, addGroupToList, deleteGroupFromList }