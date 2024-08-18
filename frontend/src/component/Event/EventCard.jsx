import React from "react";
import styles from "../../styles/Style";
import EventCountDown from "./EventCountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/action/cartAction";
import { toast } from "react-toastify";
import { backend_url } from "../../server"

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div
      className={`w-full block bg-green-200 rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 mb-2`}
    >
      <div className="w-full lg:-w[50%] m-auto ">
        <img src={`${backend_url}/img/product/${data.images && data.images[0]}`} alt="" className="w-[90%]" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h3 className={`${styles.productTitle}`}>{data.name}</h3>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500px] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400px] text-[20px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <EventCountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
