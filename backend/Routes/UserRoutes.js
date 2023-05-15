import express from 'express'
import { User, UpdateUser, DeleteUser, UserRegister, countUsers }  from '../Controllers/UserController.js'


const router = express.Router();

// This route is responsible about selecting user info from database
// Used in: UserList.js(Frontend side)
router.get('/', User);

// This route is responsible for updating user info
// Used in: UserList.js(Frontend side)
router.put('/:id', UpdateUser);

//This route is responsible for deleting users from database
//Used in: UserList.js(Frontend side)
router.delete('/:id', DeleteUser);

//This route is responsible for user registration
// Used in: Register.js(Frontend side)
router.post('/', UserRegister);

// This route is responsible about counting how many users are in database.
// Used in: Dashboard.js(Frontend side)
router.get('/count', countUsers);

export default router