const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../middleware/catchAsync");
const axios = require('axios');
const crypto = require('crypto');

exports.myPayment = catchAsync(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Becodemy",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.stripeApiKey = catchAsync(async (req, res, next) => {
  res.status(200).json({
    stripeApikey: process.env.STRIPE_API_KEY,
  });
});

exports.initialPayment = catchAsync(async (req, res, next) => {
  const { totalPrice, orderId } = req.body;

  const esewaUrl = "https://uat.esewa.com.np/epay/main"; // Use production URL for live payments
  const successUrl = "http://localhost:8000/payment/esewa/success";
  const failureUrl = "http://localhost:8000/payment/esewa/failure";

  const esewaData = {
    amt: totalPrice,
    psc: 0, // service charge
    pdc: 0, // delivery charge
    tAmt: totalPrice, // total amount
    pid: orderId,
    scd: "EPAYTEST", // Esewa merchant code
    su: successUrl,
    fu: failureUrl,
  };

  // Redirect the user to the Esewa payment page with the payment data
  res.redirect(
    `${esewaUrl}?amt=${esewaData.amt}&pdc=${esewaData.pdc}&psc=${esewaData.psc}&tAmt=${esewaData.tAmt}&pid=${esewaData.pid}&scd=${esewaData.scd}&su=${esewaData.su}&fu=${esewaData.fu}`
  );
});

exports.handlingSuccess = catchAsync(async (req, res) => {
  const { oid, amt, refId } = req.query; // oid = orderId, amt = amount, refId = payment reference from Esewa

  const esewaVerificationUrl = "https://uat.esewa.com.np/epay/transrec"; // Use production URL for live payments

  const esewaData = {
    amt,
    rid: refId,
    pid: oid,
    scd: "EPAYTEST", // Esewa merchant code
  };

  try {
    // Verify the payment by sending a POST request to Esewa's verification endpoint
    const { data } = await axios.post(esewaVerificationUrl, esewaData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (data.includes("<response_code>Success</response_code>")) {
      // Payment verification successful
      // Update order status in your database
      await Order.findByIdAndUpdate(oid, {
        "paymentInfo.id": refId,
        "paymentInfo.status": "Success",
        "paymentInfo.type": "Esewa",
        paidAt: Date.now(),
      });

      res.status(200).json({ message: "Payment successful and verified." });
    } else {
      res.status(400).json({ message: "Payment verification failed." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying payment with Esewa.", error });
  }
});

exports.handlingFailure = catchAsync(async (req, res, next) => {
  const { oid } = req.query; // oid = orderId

  // Update order status in the database to reflect failure
  Order.findByIdAndUpdate(oid, {
    "paymentInfo.status": "Failed",
    "paymentInfo.type": "Esewa",
  })
    .then(() => res.status(200).json({ message: "Payment failed." }))
    .catch((error) =>
      res.status(500).json({ message: "Error updating order status.", error })
    );
});
