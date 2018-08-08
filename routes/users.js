const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        date: req.body.date
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, message: 'Failed to register user' });
        } else {
            res.json({ success: true, message: 'User registered' });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) =>  {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    message: 'You are now logged in!',
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        sex: user.sex,
                        isAdmin: user.isAdmin,
                        date: user.date
                    }
                });
            } else {
                res.json({ success: false, message: 'Wrong password' });
            }
        });
    });
});



// Profile
router.get('/profile', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    res.json({user: req.user});
});

router.put('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    const id = req.user.id;
    const obj = req.body;
    return

    User.findByIdAndUpdate(id, { firstName: obj.firstName, lastName: obj.lastName, email: obj.email, sex: obj.sex }, function(err) {
        if (err) {
            res.json({ success: false, message: 'Error' });
        }
        res.json({ success: true, message: 'Updated' });
    })
});

module.exports = router;
