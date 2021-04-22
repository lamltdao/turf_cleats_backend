const BrandController =require('../controllers/BrandController');
const express=require('express');
const router= express.Router();

router.post('/', BrandController.createNewBrand)
router.get('/', BrandController.getAllBrands)
router.get('/:id', BrandController.getBrandById)
router.put('/:id',BrandController.updateBrandById)
router.delete('/:id', BrandController.deleteBrandById)

module.exports=router;