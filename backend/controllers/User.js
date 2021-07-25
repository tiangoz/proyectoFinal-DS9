const { body, param, validationResult } = require('express-validator');

const { UserModel } = require('../models/User');

module.exports.validators = {
    signupUser: [
        body('name', 'Name is required').exists(),
        body('email', 'Email is required').exists(),
        body('password', 'Password is required').exists(),
    ],
    loginUser: [
        body('email', 'Email is required').exists(),
        body('password', 'Password is required').exists(),
    ],
    getUser: [],
    getAnUser: [
        param('id', 'Id is required').exists(),
    ],
    createUser: [
        body('name', 'Name is required').exists(),
        body('email', 'Email is required').exists(),
        body('password', 'Password is required').exists(),
    ],
    updateAnUser: [
        param('id', 'Id is required').exists(),
    ],
    deleteAnUser: [
        param('id', 'Id is required').exists(),
    ]
};

module.exports.controllers = {
    signupUser: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if (!errors.isEmpty()) { return res.json(errors); }
            const { name, email, password, age } = req.body;

            // Save in database
            const userInstance = UserModel({ name, email, password, age });
            await userInstance.validate();
            const user = await userInstance.save();
            res.json({ model: 'user', data: user });
        } catch (error) {
            res.json({ message: error.message });
        }
    },
    loginUser: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if (!errors.isEmpty()) { return res.json(errors); }
            const { email, password } = req.body;

            // Login the user
            const user = await UserModel.findOne({ email });
            if (!user) { throw new Error('Either email or password does not exists.') }

            const isValid = await user.validatePassword(password);
            if (!isValid) { throw new Error('Either email or password does not exists.') }

            const token = await user.getAccessToken();
            return res.json({ token });
        } catch (error) {
            res.json({ message: error.message });
        }
    },
    getUser: async (req, res) => {
        const users = await UserModel.find();
        res.json({ model:'user', count: users.length, data: users })
    },
    getAnUser: async (req, res) => {
        try{
            const users = await UserModel.findOne({_id: req.params.id});
            res.json({ model:'user', count: users.length, data: users })
        } catch (error) {
            res.json({message: error.message});
        }
    },
    createUser: async (req, res) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}
            const { name, email, password, age, active } = req.body;

            // Save in database
            const users = await UserModel.create({ name, email, password, age, active });
            res.json({ model:'user', count: users.length, data: users });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    updateAnUser: async (req, res) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}
            const { name, email, password, age, active } = req.body;

            // Update in database
            await UserModel.findOneAndUpdate({_id: req.params.id}, { name, email, password, age, active });
            const users = await UserModel.findOne({_id: req.params.id});
            res.json({ model:'user', count: users.length, data: users });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    deleteAnUser: async (req, res) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}

            // Delete in database
            const users = await UserModel.deleteOne({_id: req.params.id});
            res.json({});
        } catch (error) {
            res.json({message: error.message});
        }
    },
};