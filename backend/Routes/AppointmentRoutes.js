import express from 'express'
import cookieParser from 'cookie-parser';
import {CompletedAppointment, DeleteAppointment, InsertAppointment, InsertAppointmentTest, VerifyUser, CountAppointments, Appointments, AddSlots, TimeSlots, VerifyUserAppointments, CompletedAppointments, UnfinishedAppointments, UserReports, VerifyUserRole, DoctorAppointments, getDoctorAppointments} from '../Controllers/AppointmentController.js';


const router = express.Router();
router.use(express.json());
router.use(cookieParser());

// This function is responsible for inserting appointments in database
// Used in:InsertAppointment(Frontend side)
router.post('/', InsertAppointmentTest);

router.post('/test', InsertAppointment);

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
router.get('/user-report/:appointmentid', UserReports);
//
//
router.get('/count', CountAppointments);

//
//
router.get('/fetch', Appointments);

//
//
router.get('/doctor-appointments', DoctorAppointments);

//
//
router.get('/doctor-verify', VerifyUserRole);

router.get('/doctorappointments', getDoctorAppointments);

router.put('/complete/:appointmentId', CompletedAppointment)


//
//
router.get('/completedappointments', CompletedAppointments);

//
//
router.get('/unfinishedappointments', UnfinishedAppointments);

//
//
router.get('/fetchtimeslots', TimeSlots);

export default router