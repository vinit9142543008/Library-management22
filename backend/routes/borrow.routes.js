import express from "express";
import { borrowBook, getBorrow, returnBook } from "../controllers/borrow.controller.js";

const router = express.Router();

router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.get("/",getBorrow)

export default router;