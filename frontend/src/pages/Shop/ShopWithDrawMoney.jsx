import React from "react";
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader";
import WithdrawMoney from "../../component/Shop/WithdrawMoney";
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar";

const ShopWithDrawMoney = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithDrawMoney;
