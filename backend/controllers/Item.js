const { body, param, validationResult } = require('express-validator');

const { ItemModel } = require('../models/Item');

module.exports.validators = {
    getItems: [],
    getAnItem: [
        param('id', 'Id is required').exists(),
    ],
    createItem: [
        body('name', 'Name is required').exists(),
        body('price', 'Price is required').exists(),
        body('description', 'Description is required').exists(),
    ],
    updateItem: [
        param('id', 'Id is required').exists(),
    ],
    changeStateItem: [
        param('id', 'Id is required').exists(),
    ],
    deleteItem: [
        param('id', 'Id is required').exists(),
    ]
};

module.exports.controllers = {
    getItems: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}

            // Get of database
            const items = await ItemModel.find();
            res.json({ model: 'item', count: items.length, data: items });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    getAnItem: async (req, res) => {
        try{
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}

            // Get one of database
            const item = await ItemModel.findOne({_id: req.params.id});
            res.json({ model: 'item', count: item.length, data: item })
        } catch (error) {
            res.json({message: error.message});
        }
    },
    createItem: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}
            const { name, description, price } = req.body;

            // Create in database
            const items = await ItemModel.create({ name, description, price });
            res.json({ model: 'item', count: items.length, data: items });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    updateItem: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}
            const { name, description, price } = req.body;

            // Update in database
            await ItemModel.findOneAndUpdate({_id: req.params.id}, { name, description, price });
            const item = await ItemModel.findOne({_id: req.params.id});
            res.json({ model: 'item', count: item.length, data: item });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    changeStateItem: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}
            const id = req.params.id;

            // Change State of active field in database
            const item = await ItemModel.findOne({ _id: id });
            item.active = false;
            await item.validate();
            await item.save();
            res.json({message: `El articulo se ha colocado en: Inactivated ${id}` });
        } catch (error) {
            res.json({message: error.message});
        }
    },
    deleteItem: async (req, res, next) => {
        try {
            // Evaluate validations
            const errors = validationResult(req);
            if(!errors.isEmpty()){ return res.json(errors);}

            // Delete in database
            const items = await ItemModel.deleteOne({_id: req.params.id});
            res.json({message: `El articulo se ha eliminado` });
        } catch (error) {
            res.json({message: error.message});
        }
    }
};