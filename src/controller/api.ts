import {Request, Response, NextFunction} from "express";
import {ApiError} from "../entities/ApiError";
import { updateUser, fetchUser, fetchIdbyEmail } from '../repository/userCollection';


export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {userId, data} = req.body;
		await updateUser(userId, data);
		const userDoc = await fetchUser(userId);
    if (!userDoc.exists) {
      throw new ApiError("User not found", 404);
    }
    res.status(200).send({...userDoc.data(), message: "User data updated successfully"});
  } catch (error) {
		console.log(error)
    next(new ApiError("Failed to update user data", 500));
  }
};

export const fetchUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {userId} = req.params;
		const userDoc = await fetchUser(userId);
    if (!userDoc.exists) {
      throw new ApiError("User not found", 404);
    }
    res.status(200).send(userDoc.data());
  } catch (error) {
    next(error);
  }
};

export const fetchIdbyEmailData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email} = req.params;
		const userDoc = await fetchIdbyEmail(email);
    if (userDoc.empty) {
      throw new ApiError("User not found", 404);
    }
		const userId = userDoc.docs[0].id;
    res.status(200).send({userId});
  } catch (error) {
    next(error);
  }
};
