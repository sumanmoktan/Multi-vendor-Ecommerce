const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const cors = require("cors");

//Router import for middleware
const userRoute = require("./routes/userRoute");
const shopRoute = require("./routes/shopRoute");
const proudctRoute = require("./routes/productRoute");
const eventRoute = require("./routes/eventRoute");
const coupounRoute = require("./routes/coupounRoute");
const paymentRoute = require("./routes/paymentRoute");
const orderRoute = require("./routes/orderRoute");

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//this is for routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/product", proudctRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/coupoun", coupounRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/order", orderRoute);

//this is use for error handling
app.use(ErrorHandler);

module.exports = app;
