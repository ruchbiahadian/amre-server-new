import express from "express";
import { getRekening} from "../controllers/rekening.js";

const router = express.Router()

router.get("/find/:userId", getRekening)

export default router