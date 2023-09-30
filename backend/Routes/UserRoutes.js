import express from 'express'
import { User, GetUser, RecentUser, UpdateUser, DeleteUser, UserRegister, CountUsers, Doctors, CountDoctors, SendEmail, getStaff }  from '../Controllers/UserController.js'


const router = express.Router();

// This route is responsible about selecting user info from database
// Used in: Users.js(Frontend side)
router.get('/', User);

// This route is responsible about selecting user info from database
// Used in: Staff.js(Frontend side)
router.get('/getStaff', getStaff);

// This route is responsible about selecting user info where id = ? from database
// Used in: SendEmail.js(Frontend side)
router.get('/:id', GetUser);

// This route is responsible about selecting user info from database
// Used in: UserList.js(Frontend side)
router.get('/recentusers', RecentUser);

// This route is responsible for updating user info
// Used in: UserList.js(Frontend side)
router.put('/:id', UpdateUser);

//This route is responsible for deleting users from database
//Used in: UserList.js(Frontend side)
router.delete('/:id', DeleteUser);

//This route is responsible for user registration
// Used in: Register.js(Frontend side)
router.post('/', UserRegister);

//This route is responsible for sending emails to the users
//Used in: SendEmail.js(Frontend side)
router.post('/send-email', SendEmail);

// This route is responsible about counting how many users are in database.
// Used in: Dashboard.js(Frontend side)
router.get('/count', CountUsers);


//
//
router.get('/countDoctors', CountDoctors);

//
//
router.get('/doctors/:selectedCity', Doctors);



export default router