const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/verifyToken');
const UserController = require('../controllers/UserController');

router.post('/login', UserController.login);
router.post('/', UserController.signUp)
router.get('/account', verifyToken, UserController.getAccountByToken)
router.put('/account', verifyToken, UserController.updateAccountByToken)
router.get('/:id', isAdmin, UserController.getUserById)
router.put('/:id', isAdmin, UserController.updateUserById)
router.delete('/:id', isAdmin, UserController.deleteUserById)
router.get('/', isAdmin, UserController.getAllUser)

module.exports = router;
