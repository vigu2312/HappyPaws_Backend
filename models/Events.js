const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
  
    eventName: {
        type: String,
        required: [true, 'Please select event']
    },
   
});

module.exports = Events = mongoose.model('events', EventsSchema);