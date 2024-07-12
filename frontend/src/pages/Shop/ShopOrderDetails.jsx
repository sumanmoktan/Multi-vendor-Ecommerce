import React from "react";
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader";
import Footer from "../../component/Layout/Footer";
import OrderDetails from "../../component/Shop/OrderDetail";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
