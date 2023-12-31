const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    userName: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    role: { type: String, default: 'user', require: true },
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;