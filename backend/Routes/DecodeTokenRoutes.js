// Import the necessary modules and controllers
import express from 'express';
import { decodeTokenAndGetUserIdNum } from '../Controllers/decodeTokenAndGetUserIdNum.js';

// Create an instance of the Express router
const router = express.Router();

// Define the route for decoding the token and getting the userIdNum
/*router.post('/', (req, res) => {
  const { token } = req.body;
  const userIdNum = decodeTokenAndGetUserIdNum(token);
  res.json({ userIdNum });
});
*/

// Export the router
export default router;
