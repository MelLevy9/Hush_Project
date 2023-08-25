const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const { AUTH_MAX_AGE } = process.env;

const signUp = async (req,res) => {
    const { userName, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({error: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        const payload = {
            id: newUser.id,
            userName: newUser.userName,
            role: newUser.role,
        };

        const token = await generateToken(payload);

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: AUTH_MAX_AGE,
        });

        return res.status(200).json({message: 'User signed up successfully'});
    } catch(error) {
        return res.status(400).json({error: error});
    }
};

const signIn = async (req,res) => {

    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(402).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const payload = {
            id: user.id,
            userName: user.userName,
            role: user.role,
        };

        const token = await generateToken(payload);

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: AUTH_MAX_AGE,
        });

        res.status(200).json(payload);
        
    } catch(error) {

        res.status(400).json({error: 'Cannot sign you in'});

    }

};

const signOut = (req,res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Signed out successfully'});
};

module.exports = { signUp, signIn, signOut };