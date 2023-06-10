import express from 'express'
import { Login, VerifyUser, Logout, VerifyUserRole}  from '../Controllers/LoginController.js'
import cookieParser from 'cookie-parser';



const router = express.Router();
router.use(express.json());
router.use(cookieParser());

// This route is responsible for selecting user data then checking if passwords match,
// incase of no results sends a message  that user doesnt exist.
// Used in: Login.js(Frontend side)
// router.get('/', LogInSession);

//This route checks if there is data saved to session and sets loggedIn variable to on or off, which will be used after.
// Used in: Login.js(Frontend side)
router.post('/', Login);



//
//
/*
router.get('/', verifyUser, (req,res)=>{
    return res.json({Status: "Success", idnum: req.idnum})
}); */
router.get('/', VerifyUser);


//
//
router.post('/logout', Logout);
  
//
//
router.get('/rolecheck', VerifyUserRole);


export default router