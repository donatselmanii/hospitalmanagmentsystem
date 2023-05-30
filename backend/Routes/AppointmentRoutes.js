import express from 'express'
import cookieParser from 'cookie-parser';
import { DeleteAppointment, InsertAppointment, VerifyUser, CountAppointments, Appointments, AddSlots, TimeSlots, VerifyUserAppointments} from '../Controllers/AppointmentController.js';


const router = express.Router();
router.use(express.json());
router.use(cookieParser());

// This function is responsible for inserting appointments in database
// Used in:InsertAppointment(Frontend side)
router.post('/', InsertAppointment);



//
//
router.post('/timeslots', AddSlots);

//
//
router.delete('/', DeleteAppointment);

//This function is responsible for
//Used in: (Frontend side)
router.get('/', VerifyUser);

//
//
router.get('/userappointments', VerifyUserAppointments);

//
//
router.get('/count', CountAppointments);

//
//
router.get('/fetch', Appointments);



//
//
router.get('/fetchtimeslots', TimeSlots);

export default router