const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../middleware/catchAsync");

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

// const axios = require("axios");

// // Function to initiate Khalti payment
// exports.callKhalti = async (req, res) => {
//   try {
//     const { amount, purchase_order_id, purchase_order_name, customer_info } =
//       req.body;

//     const formData = {
//       return_url: "http://yourdomain.com/khalti/callback",
//       website_url: "http://yourdomain.com",
//       amount: amount * 100, // Convert to paisa
//       purchase_order_id,
//       purchase_order_name,
//       customer_info,
//     };

//     const headers = {
//       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/initiate/",
//       formData,
//       { headers }
//     );

//     res.json({
//       message: "Khalti payment initiated successfully",
//       payment_method: "khalti",
//       data: response.data,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: err?.message });
//   }
// };

// // Function to handle Khalti callback and verify payment
// exports.handleKhaltiCallback = async (req, res, next) => {
//   try {
//     const { pidx, purchase_order_id, transaction_id, message } = req.query;

//     if (message) {
//       return res
//         .status(400)
//         .json({ error: message || "Error Processing Khalti" });
//     }

//     const headers = {
//       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       { headers }
//     );

//     if (response.data.status !== "Completed") {
//       return res.status(400).json({ error: "Payment not completed" });
//     }

//     // Pass the transaction details to the next middleware
//     req.transaction_uuid = purchase_order_id;
//     req.transaction_code = pidx;
//     next();
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(400)
//       .json({ error: err?.message || "Error Processing Khalti" });
//   }
// };
