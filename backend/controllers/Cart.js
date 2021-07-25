const { body, param, validationResult } = require('express-validator');

const { CartModel } = require('../models/Cart');
const { ItemModel } = require('../models/Item');

module.exports.validators = {
    getCart: [],
    addItemToCart: [
        body('id', 'Id is required').exists(),
    ],
    deleteItemFromCart: [
        param('id', 'Id is required').exists(),
    ],
};

module.exports.controllers = {
    getCart: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}

            // Get Items of cart in database
            const cart = await CartModel.find();
            res.json({ model: 'cart', count: cart.length, data: cart });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    addItemToCart: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}
            const { id } = req.body;

            // Add Items to cart in database
            const item = await ItemModel.findById(id);
            await CartModel.create({ item });
            const cart = await CartModel.find();
            res.json({ model: 'cart', count: cart.length, data: cart });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    deleteItemFromCart: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}
            // const { id } = req.body();

            // delete Items of cart in database
            // const item = await ItemModel.findById(id);
            //Tomamos el Id del Item en Cart. No el ID del item de Items.
            await CartModel.deleteOne({_id: req.params.id});
            const cart = await CartModel.find();
            res.json({ model: 'cart', count: cart.length, data: cart });
        } catch (error) {
            res.json({message: error.message});
        }
    },
};