const SneakersController = require('../controllers/SneakersController')
const isAdmin = require('../middleware/isAdmin')
const express=require('express');
const router= express.Router();

router.post('/', isAdmin, SneakersController.createNewSneakers)
router.get('/', SneakersController.getAllSneakers)
router.get('/:id', SneakersController.getSneakersById)
router.put('/:id', isAdmin, SneakersController.updateSneakersById)
router.delete('/:id', isAdmin, SneakersController.deleteSneakersById)
router.post('/:id/comment', SneakersController.addComment)
router.get('/:id/comment', SneakersController.getComment)

module.exports=router;