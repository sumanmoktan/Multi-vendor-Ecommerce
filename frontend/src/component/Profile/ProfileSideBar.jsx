import React from "react";
import axios from 'axios';
import {server} from '../../server'
import {toast} from 'react-toastify';
import { RiLockPasswordLine } from "react-icons/ri";
import {
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const  handleLogout = () =>{
    axios.get(`${server}/api/v1/user/logout`, {withCredentials: true}).then((res)=>{
        toast.success(res.data.message);
        window.location.reload(true);
        navigate('/login');  
    })
    .catch((error) => {
        // Handle error, show an error message, redirect, etc.
        console.error('Logout failed:', error);
      });
  }


  return (
    <div className="w-full bg-green shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={22} color={active === 1 ? "red" : ""} />
        <span className={`pl-2 ${active === 1 ? "text-[red]" : ""} sm:block hidden`}>
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={22} color={active === 2 ? "red" : ""} />
        <span className={`pl-2 ${active === 2 ? "text-[red]" : ""} sm:block hidden`}>
          Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={22} color={active === 3 ? "red" : ""} />
        <span className={`pl-2 ${active === 3 ? "text-[red]" : ""} sm:block hidden`}>
          Refunds
        </span>
      </div>
      {/* <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={22} color={active === 4 ? "red" : ""} />
        <span className={`pl-2 ${active === 4 ? "text-[red]" : ""} sm:block hidden`}>
          Inbox
        </span>
      </div> */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={22} color={active === 5 ? "red" : ""} />
        <span className={`pl-2 ${active === 5 ? "text-[red]" : ""} sm:block hidden`}>
          Order Tracker
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={22} color={active === 6 ? "red" : ""} />
        <span className={`pl-2 ${active === 6 ? "text-[red]" : ""} sm:block hidden`}>
          Change Password
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={22} color={active === 7 ? "red" : ""} />
        <span className={`pl-2 ${active === 7 ? "text-[red]" : ""} sm:block hidden`}>
          Address
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || handleLogout()}
      >
        <AiOutlineLogin size={22} color={active === 8 ? "red" : ""} />
        <span className={`pl-2 ${active === 8 ? "text-[red]" : ""} sm:block hidden`}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSideBar;
