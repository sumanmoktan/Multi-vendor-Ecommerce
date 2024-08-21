import React from "react";
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../component/Shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
    <div className="bg-green-50">
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <DashboardHero/>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
