import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import * as userRepo from '../repository/userCollection';
import { User } from '../entities/user';

// Fetch user data
export const fetchUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId || req.user?.uid;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Bad request: User ID is required',
        error: 'No user ID provided'
      });
    }
    
    const user = await userRepo.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'The requested user does not exist'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: user
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch user data'
    });
  }
};

// Update user data
export const updateUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId || req.user?.uid;
    const userData: Partial<User> = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Bad request: User ID is required',
        error: 'No user ID provided'
      });
    }
    
    // Check if user exists
    const existingUser = await userRepo.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'The user you are trying to update does not exist'
      });
    }
    
    // Prevent updating sensitive fields
    const { id, createdAt, ...updateData } = userData;
    
    // Update user
    const updatedUser = await userRepo.updateUser(userId, updateData);
    
    return res.status(200).json({
      success: true,
      message: 'User data updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to update user data'
    });
  }
}; 