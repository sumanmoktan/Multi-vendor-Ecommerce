const express = require("express");
const paymentController = require("../controller/paymentController");

const router = express.Router();

router.post("/process", paymentController.myPayment);
router.get("/stripeapike", paymentController.stripeApiKey);

router.post("/esewa", paymentController.initialPayment);
router.get("/esewa/success", paymentController.handlingSuccess);
router.get("/esewa/failure", paymentController.handlingFailure);

module.exports = router;
