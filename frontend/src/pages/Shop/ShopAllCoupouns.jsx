import React from 'react'
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar";
import AllCoupons from '../../component/Shop/AllCoupons';

const ShopAllCoupouns = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
            <AllCoupons />
        </div>
      </div>
</div>
  )
}

export default ShopAllCoupouns