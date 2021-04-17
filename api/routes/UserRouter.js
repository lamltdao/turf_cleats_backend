const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const UserController = require('../controllers/UserController');

router.post('/', UserController.signUp)
router.get('/:id', UserController.getUserById)
router.put('/:id', UserController.updateUserById)
router.delete('/:id', UserController.deleteUserById)
router.get('/', isAdmin, UserController.getAllUser)

module.exports = router;
