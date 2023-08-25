const jwt = require('jsonwebtoken');
const { JWT_SECRET, AUTH_MAX_AGE } = process.env;

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            userName: user.userName,
            role: user.role,
        },
        process.env.JWT_SECRET, 
        { expiresIn: '15m' }
    );
};

const refreshAuthTokenCookie = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        console.log('no token cookie to refresh');
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const newToken = await generateToken(decoded);
        res.cookie('token', newToken, {
            httpOnly: false,
            maxAge: AUTH_MAX_AGE,
        });
        next();
    } catch(error) {
        return res.status(401).json({error: 'Invalid token'});
    }

};

module.exports = { generateToken, refreshAuthTokenCookie };