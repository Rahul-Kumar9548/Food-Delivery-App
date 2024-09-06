import express from "express";
import { postOrder, postValidate } from "../controller/payment.js";

const router = express.Router();

router.post("/order", postOrder);
router.post("/order/validate", postValidate);

export default router;
