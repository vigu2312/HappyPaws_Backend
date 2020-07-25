/************
 * Author: Moni Shah 
 **********/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ShareyourStorySchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add your email'],
    },
    story: {
        type: String,
        required: [true, 'Please add your story']
    },
    storyshared_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = ShareyourStory = mongoose.model('ShareyourStory', ShareyourStorySchema);