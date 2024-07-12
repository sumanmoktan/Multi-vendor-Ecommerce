import React from 'react'
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar";
import AllProducts from "../../component/Shop/AllProduct";

const ShopAllProducts = () => {
  return (
    <div>
    <DashboardHeader/>
    <div className="flex justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
            <AllProducts />
        </div>
      </div>
</div>
  )
}

export default ShopAllProducts