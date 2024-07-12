import React from "react";
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar";
import AllOrders from "../../component/Shop/AllOrders";

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
