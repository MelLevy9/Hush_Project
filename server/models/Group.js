const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;