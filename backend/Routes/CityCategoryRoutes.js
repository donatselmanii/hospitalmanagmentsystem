import express from 'express'
import { InsertCityCategory, DeleteCityCategory, CityList } from '../Controllers/CityCategoryController.js'


const router = express.Router()

//This route is responsible for inserting cities into option menus
//Used in: InsertAppointment.js(Frontend side)
router.post('/', InsertCityCategory)

//This route is responsible for deleting cities from option menus
//Used in:
router.delete('/', DeleteCityCategory)

//
//
router.get('/', CityList)

export default router


