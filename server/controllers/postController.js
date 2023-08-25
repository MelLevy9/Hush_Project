const Joi = require('joi');
const Post = require('../models/Post');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


const postSchema = Joi.object({
  title: Joi.string().required(),
  bodyText: Joi.string().optional(),
  userId: Joi.string().required(),
  groupId: Joi.string().required(),
});

const getAllPosts = async (req, res, next) => {
  try{
    const { page=1, limit=25 } = req.query;

    if (limit>50) limit = 50;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const posts = await Post.paginate({}, options);

    const postsFixed = { ...posts };
    postsFixed.data = postsFixed.docs;
    delete postsFixed.docs;

    return res.status(200).json(postsFixed)

  } catch (error) {

    next (error);

  }
};


const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(new ObjectId(req.params.id));
    
   
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ data: post });

  } catch (error) {
    next(error);
  }
}

const getMyPostList = async (req, res, next) => {
  const userId = req.params.userId;

  try {
  
  const userPosts = await Post.find({ userId });

  if (!userPosts.length) {
    return res.status(404).json({ error: 'Could not find posts for this user' });
  }

  return res.status(200).json({ userPosts });

} catch (error) {
  next(error)
}

}


const createPost = async (req, res, next) => {
  const {userId, groupId, title, bodyText}=req.body
  
  try {
    const { error } = postSchema.validate(req.body);
    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

  const post = await Post.create({
     title,
     bodyText,
     userId,
     groupId
  });

  return res.status(200).json({ created: post });
  
  } catch (error) {
    next(error);
  }

}


const updatePost = async (req, res, next) => {
  
  const schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().optional(),
    bodyText: Joi.string().optional(),
    userId: Joi.string().required(),
    groupId: Joi.string().required(),
    __v: Joi.number().optional(),
  })
  
  try {
    const { error } = schema.validate(req.body);

    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const post = await Post.findByIdAndUpdate(new ObjectId(req.params.id), req.body, {
      new:true
    });

    if(!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ updated: post });
  } catch (error) {
    next(error);
  }
}


const deletePost = async (req, res, next) => {
  
  try {
    const post = await Post.findByIdAndRemove(new ObjectId(req.params.id));

    if(!post) {
      res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ deleted: post });
  } catch (error) {
    next(error)
  }
}


const searchPosts = async(req, res, next) => {
  const {term} = req.query;

  try {
    
    const posts = await Post.find({title: {$regex:term, $options: 'i'}});

    if (!posts.length) {
      return res.status(404).json({ error: 'The search query returned no results' })
    }

    return res.status(200).json({ data: posts });

  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost, searchPosts, getMyPostList };