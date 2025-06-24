const express = require('express');
const auth = require('../middleware/auth');

// A factory function to create CRUD routes for a given model
const createCrudRoutes = (Model) => {
    const router = express.Router();

    // GET all items
    router.get('/', async (req, res) => {
        try {
            const items = await Model.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // GET a single item
    router.get('/:id', async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (item == null) {
                return res.status(404).json({ message: 'Cannot find item' });
            }
            res.json(item);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    });

    // CREATE an item (protected)
    router.post('/', auth, async (req, res) => {
        const item = new Model(req.body);
        try {
            const newItem = await item.save();
            res.status(201).json(newItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // UPDATE an item (protected)
    router.patch('/:id', auth, async (req, res) => {
        try {
            const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // DELETE an item (protected)
    router.delete('/:id', auth, async (req, res) => {
        try {
            await Model.findByIdAndDelete(req.params.id);
            res.json({ message: 'Deleted Item' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
};

module.exports = createCrudRoutes; 