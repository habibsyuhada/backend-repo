import {db} from "../config/firebaseConfig";

export const updateUser = async (userId: string, data: any) => {
  await db.collection("USERS").doc(userId).set(data, {merge: true});
};

export const fetchUser = async (userId: string) => {
  const userDoc = await db.collection("USERS").doc(userId).get();
  return userDoc;
};

export const fetchIdbyEmail = async (email: string) => {
	const userDoc = await db.collection('USERS').where('email', '==', email).get();
  return userDoc;
};
