import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebaseConfig';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
        error: 'No authentication token found'
      });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.role || 'user'
      };
      
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token',
        error: 'Authentication token is invalid'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Authentication process failed'
    });
  }
};

// Optional middleware to check if user has admin role
export const adminAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Admin access required',
      error: 'You do not have permission to access this resource'
    });
  }
  
  next();
}; 