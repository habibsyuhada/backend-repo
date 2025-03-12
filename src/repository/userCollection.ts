import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';
import * as admin from 'firebase-admin';

const COLLECTION_NAME = 'USERS';
const usersCollection = db.collection(COLLECTION_NAME);

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await usersCollection.doc(userId).get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  try {
    // Add updatedAt timestamp
    const updateData = {
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    // Remove id from the update data if it exists
    if ('id' in updateData) {
      delete updateData.id;
    }
    
    await usersCollection.doc(userId).update(updateData);
    
    // Fetch and return the updated user
    const updatedUser = await getUserById(userId);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    const now = new Date().toISOString();
    const newUser = {
      ...userData,
      createdAt: now,
      updatedAt: now,
      isActive: true
    };
    
    const docRef = await usersCollection.add(newUser);
    return { id: docRef.id, ...newUser } as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await usersCollection.get();
    return snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as User));
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}; 