import React from "react";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import UserOrderDetails from "../component/UserOrderDetails";

const OrderDetails = () => {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetails;
