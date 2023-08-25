const Joi = require('joi');
const Group = require('../models/Group');
 const Post = require('../models/Post');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


const groupSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const getAllGroups = async (req, res, next) => {
  try{
   
    const groups = await Group.find();

    if (!groups) {
      console.log("there are no groups");
    } 
    return res.status(200).json(groups);

  } catch (error) {

    next (error);

  }
};


const getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findById(new ObjectId(req.params.id));
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ data: group });

  } catch (error) {
    next(error);
  }
}


const createGroup = async (req, res, next) => {
  const {name, description}=req.body
  try {
    const { error } = groupSchema.validate(req.body);
    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const group = await Group.create(req.body);
    return res.status(200).json({ created: group });
  } catch (error) {
    next(error);
  }

}


const updateGroup = async (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    __v: Joi.number().optional(),
  })
  try {
    const { error } = schema.validate(req.body);

    if(error) {
      console.log(error)
      return res.status(400).json({ error: error.details[0].message });
    }

    const group = await Group.findByIdAndUpdate(new ObjectId(req.params.id), req.body, {
      new:true
    });

    if(!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json({ updated: group });
  } catch (error) {
    next(error);
  }
}


const deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndRemove(new ObjectId(req.params.id));

    if(!group) {
      res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json({ deleted: group });
  } catch (error) {
    next(error)
  }
}



const getGroupPostsById = async (req, res, next) => {
  try {
    const posts = await Post.find({ groupId: new ObjectId(req.params.id)});
    
   
    if (posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for the given group' });
    }

    res.status(200).json({ data: posts });

  } catch (error) {
    next(error);
  }
}



module.exports = { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup, getGroupPostsById }