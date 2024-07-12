import React from "react";
// import Footer from "../../components/Layout/Footer";
import ShopSettings from "../../component/Shop/ShopSettings";
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar";

const ShopSettingPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingPage;
