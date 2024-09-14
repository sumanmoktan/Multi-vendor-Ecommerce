import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/Style";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/action/cartAction";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/action/wishlistAction";
import { backend_url } from "../../../server";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductCardDetails = ({ setOpen, data }) => {
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  // const handleMessageSubmit = () => {
  //   // console.log(suman);
  // };

  const decrementcount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementcount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] sm:w-[60%] h-[90vh] overflow-y-scroll sm:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full sm:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}/img/product/${
                    data.images && data.images[0]
                  }`}
                  alt=""
                />
                <div className="flex">
                  {/* <img
                    src={data.shop.shop_avatar.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt=""
                  /> */}
                  <div>
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h5 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h5>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
                </div>
                {/* <div
                  className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    send Message <AiOutlineMessage ml-1 />
                  </span>
                </div> */}
                <h5 className="text-[15px] text-[red] mt-5">
                  ({data?.sold_out}) sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-12 pr-3">
                  <div>
                    <button
                      onClick={decrementcount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      onClick={incrementcount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove form whitelist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add form whitelist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCardDetails;
