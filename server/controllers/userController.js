const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const userSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().optional().default('user').valid('user','admin'),
});


const getAllUsers = async (req, res, next) => {
    try{
   
        const users = await User.find();
    
        if (!users) {
          console.log("there are no users");
        } 
        return res.status(200).json(users);
    
      } catch (error) {
    
        next (error);
    
      }
 };


const getUserById = async (req, res, next) => { 
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }
        return res.status(200).json({data: user});
    } catch(error) {
        next(error);
    }
 };


const createUser = async (req, res, next) => {
    const { userName, email, password, role } = req.body;
    
    try {
        
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        
        const found = await User.findOne({email});
        if(found) {
            return res.status(409).json({error: 'This email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({ created: user });
    } catch(error) {
        next(error);
    }
 };


const updateUser = async (req, res, next) => {

    const schema = Joi.object({
        _id: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).optional(),
        role: Joi.string().optional().default('user').valid('user','admin'),
        __v: Joi.number().optional(),
    });

    const{userName, email, password, role} = req.body
    
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        let updatedUser;
        if (password) { 
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    userName,
                    email,
                    password: hashedPassword,
                    role,
                },
                { new: true }
            ).select('-password');
        } else {
            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    userName,
                    email,
                    role,
                },
                { new: true }
            ).select('-password');
        };

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ updated: updatedUser });

    } catch(error) {
        console.log(error)
        next(error);
    }
 };


const deleteUser = async (req, res, next) => { 

    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id).select('-password');
    
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        return res.status(200).json({ deleted: deletedUser });

    } catch(error) {
        next(error);
    }
 };

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };