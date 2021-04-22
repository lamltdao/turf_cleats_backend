const SneakersController = require('../controllers/SneakersController')
const isAdmin = require('../middleware/isAdmin')
const verifyToken = require('../middleware/verifyToken')
const express=require('express');
const router= express.Router();

router.get('/', SneakersController.getAllSneakers)
router.get('/:id', SneakersController.getSneakersById)
router.post('/', isAdmin, SneakersController.createNewSneakers)
router.put('/:id', isAdmin, SneakersController.updateSneakersById)
router.delete('/:id', isAdmin, SneakersController.deleteSneakersById)
router.post('/:id/comment', verifyToken, SneakersController.addComment)
router.get('/:id/comment', SneakersController.getComment)

module.exports=router;