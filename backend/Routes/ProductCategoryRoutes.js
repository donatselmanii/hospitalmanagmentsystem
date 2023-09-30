import express from 'express'
import { InsertProductCategory, ProductCategoryList, updateProductCategory, deleteProductCategory } from '../Controllers/ProductCategoryController.js'


const router = express.Router()


router.post('/', InsertProductCategory)


//
//
router.get('/', ProductCategoryList)

router.put('/:id', updateProductCategory);

// Delete a product category by ID
//
router.delete('/:id', deleteProductCategory);

export default router


