require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { connectDatabase } = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const { refreshAuthTokenCookie } = require('./config/jwt');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const groupRoutes = require('./routes/groupRoutes');
const groupListRoutes = require('./routes/groupListRoutes');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static('static'));

connectDatabase();

app.use(refreshAuthTokenCookie);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/group-list', groupListRoutes);


app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
