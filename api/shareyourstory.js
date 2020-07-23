const Story = require('../models/ShareyourStory');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.share = (req, res, next) => {
    try {
        const { email, story } = req.body;
        // Validations 
        if ( !email || !story) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }
        User.findOne({ email })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'No such email exists' })
            })

        const newStory = new Story({
           email, story
        })
        newStory.save()
                    .then(story => {
                        res.status(200).json({
                            success: true,
                            msg: 'Story Shared successfully'
                        })
                    });
    } catch (err) {
        console.log(err)
    }
}