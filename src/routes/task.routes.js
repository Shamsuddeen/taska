const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.get('/stats', taskController.getStats);
router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;