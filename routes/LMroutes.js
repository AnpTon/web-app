const express = require('express');
const router = express.Router();
const userController = require('../controllers/LMcontroller');

router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;