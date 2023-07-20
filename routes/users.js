import express from "express";
import { getUser, updateUserTexts, updateUserProfile} from "../controllers/user.js";

const router = express.Router()


router.get("/find/:userId", getUser)
router.put("/updateUserProfile", updateUserProfile)
router.put("/updateUserTexts", updateUserTexts)


export default router