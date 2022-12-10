const mongoose = require('mongoose')
const { Schema } = mongoose;

const chatSchema = new Schema({
    username:  String,
    msg:   String,
    date: String
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat