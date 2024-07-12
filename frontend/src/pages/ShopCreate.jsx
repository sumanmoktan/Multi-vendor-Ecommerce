import React, { useEffect } from "react";
import ShopCreatePage from "../component/Shop/ShopCreatePage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreate = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);
  useEffect(() => {
    if(isSeller === true){
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, seller])

  return (
    <div>
      <ShopCreatePage />
    </div>
  );
};

export default ShopCreate;
