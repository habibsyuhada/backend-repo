import { Router } from 'express';
import { fetchUserData, updateUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Fetch user data
router.get('/fetch-user-data', fetchUserData);
router.get('/fetch-user-data/:userId', fetchUserData);

// Update user data
router.put('/update-user-data', updateUserData);
router.put('/update-user-data/:userId', updateUserData);

export default router; 