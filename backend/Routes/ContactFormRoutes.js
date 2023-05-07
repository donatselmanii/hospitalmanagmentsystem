import express from 'express'
import { ContactFormList,ConfirmMessages, ContactFormRegister } from '../Controllers/ContactFormController.js'


const router = express.Router();

// This route is responsible for selecting contactform messages from database
// Used in: AdminMessages.js(Frontend)
router.get('/', ContactFormList);

// This route is responsible for updating user info
// Used in: UserList.js(Frontend side)
router.put('/:id', ConfirmMessages);

// This route is responsible for inserting data( messages from users ) in database
// Used in:ContactForm(Frontend side)
router.post('/', ContactFormRegister);

export default router