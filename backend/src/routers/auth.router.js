const auth = require('express').Router();
const User = require('../models/user.model');
const sendToken = require('../utils/sendToken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth.middleware');

auth.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please Enter all details' });
    }
    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const encpassword = await bcrypt.hash(password, salt);

        const userdata = await User.create({
            name,
            email,
            password: encpassword
        });

        sendToken(res, userdata._id);

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: userdata._id,
                name: userdata.name,
                email: userdata.email
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

auth.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'please enter valid details'
        });
    }

    try {
        const data = await User.findOne({ email }).select('+password');

        if (!data) {
            return res.status(401).json({
                message: 'Invalid password or Email'
            });
        }

        const pass = await bcrypt.compare(password, data.password);

        if (!pass) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        sendToken(res, data._id);

        return res.status(200).json({
            message: 'login successfully',
            user: {
                _id: data._id,
                name: data.name,
                email: data.email
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});

auth.get('/me', authMiddleware, async (req, res) => {
    try {
        return res.status(200).json({
            user: req.user
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

auth.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });

    return res.status(200).json({
        message: 'Logout successful'
    });
});

module.exports = auth;