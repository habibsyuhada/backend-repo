import {Router} from "express";
import {updateUserData, fetchUserData, fetchIdbyEmailData} from "../controller/api";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.get("/fetch-user-data/:userId", authMiddleware, fetchUserData);
router.get("/fetch-id-by-email/:email", authMiddleware, fetchIdbyEmailData);
router.put("/update-user-data", authMiddleware, updateUserData);

export {router as userRoutes};
