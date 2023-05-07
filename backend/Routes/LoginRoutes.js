import express from 'express'
import { LogInSession, Login }  from '../Controllers/ContactFormController.js'


const router = express.Router();

// This route is responsible for selecting user data then checking if passwords match,
// incase of no results sends a message  that user doesnt exist.
// Used in: Login.js(Frontend side)
router.get('/', LogInSession);

//This route checks if there is data saved to session and sets loggedIn variable to on or off, which will be used after.
// Used in: Login.js(Frontend side)
router.post('/', Login);

export default router