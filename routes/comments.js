import express from "express";
import { getComments, addComments, getCommentsReimbursement, addCommentsReimbursement } from "../controllers/comment.js";

const router = express.Router()


router.get("/", getComments)
router.post("/", addComments)

router.get("/reimbursement", getCommentsReimbursement)
router.post("/reimbursement", addCommentsReimbursement)

export default router