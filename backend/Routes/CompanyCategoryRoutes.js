import express from "express";
import { CompanyList, InsertCompany, deleteCompany, updateCompany } from "../Controllers/CompanyCategoryController.js";

const router = express.Router();

router.post('/', InsertCompany);

//
//
router.get('/', CompanyList)

router.patch('/:id', updateCompany);


router.delete('/:id', deleteCompany);

export default router;