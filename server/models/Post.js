const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Types;

const postSchema = new mongoose.Schema({
    title: { type: String, require: true },
    bodyText: { type: String, require: false },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
      },
    groupId: {
        type: ObjectId,
        ref: 'Group',
        required: true,
      },
});

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;