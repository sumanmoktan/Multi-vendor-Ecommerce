// import React, { useState } from 'react'
// import {AiOutlineEye,AiFillEyeInvisible} from 'react-icons/ai';
// import {RxAvatar} from 'react-icons/rx';
// import styles from '../../styles/Style';
// import {Link, useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import {server} from '../../server';
// import {toast} from 'react-toastify';

// const SignUp = () => {
//     const [email, setEmail] = useState("");
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [visible, setVisible] = useState(false);
//     const [photo, setPhoto] = useState(null);
//     const navigate = useNavigate();

//     const handleFileInputChange =(e)=>{
//         const file = e.target.files[0];
//         setPhoto(file);
//     }

//     const handleSubmit = (e) => {
//       e.preventDefault();

//       const config = {Headers:{"Content-Type":"multipart/form-data"}};
//       const newform = new FormData();

//       newform.append("file", photo);
//       newform.append('name', name);
//       newform.append('email', email);
//       newform.append('password', password);

//       axios.post(`${server}/api/v1/user/create-user`, newform, config).then((res)=>{
//         toast.success(res.data.message);
//         navigate("/login");
//         setName("");
//         setEmail("");
//         setPassword("");
//         setPhoto();
//       }).catch((err)=>{
//         toast.error(err.response.data.message);
//       })

//   }
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Register as a new user
//         </h2>
//         <div className="bg-white p-8 rounded-md shadow-lg">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="name"
//                   autoComplete="name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type={visible ? "text" : "password"}
//                   name="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />{visible ? ( <AiOutlineEye
//                   className='absolute right-2 top-2 cursor-pointer'
//                   size={25}
//                   onClick={()=>setVisible(false)}
//                   />): ( <AiFillEyeInvisible
//                     className='absolute right-2 top-2 cursor-pointer'
//                     size={25}
//                     onClick={()=>setVisible(true)}
//                     />)}
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="avatar"
//                 className="block text-sm font-medium text-gray-700"
//               ></label>
//               <div className="mt-2 flex items-center">
//                 <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
//                   {photo ? (
//                     <img
//                       src={photo}
//                       alt="photo"
//                       className="h-full w-full object-cover rounded-full"
//                     />
//                   ) : (
//                     <RxAvatar className="h-8 w-8" />
//                   )}
//                 </span>
//                 <label
//                   htmlFor="file-input"
//                   className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//                 >
//                   <span>Upload a file</span>
//                   <input
//                     type="file"
//                     name="photo"
//                     id="file-input"
//                     accept=".jpg,.jpeg,.png"
//                     onChange={handleFileInputChange}
//                     className="sr-only"
//                   />
//                 </label>
//               </div>
//             </div>

//             <div>
//               <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 '>
//                 submit
//               </button>
//             </div>
//             <div className={`${styles.noramlFlex} w-full`}>
//               <h3>Already have an account?</h3>
//               <Link to='/login' className='text-blue-600 pl-2'>Signin </Link>

//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignUp

import React, { useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/Style";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newform = new FormData();

    newform.append("photo", photo);
    newform.append("name", name);
    newform.append("email", email);
    newform.append("password", password);

    axios
      .post(`${server}/api/v1/user/create-user`, newform, config)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        setName("");
        setEmail("");
        setPassword("");
        setPhoto(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
        <div className="bg-white p-8 rounded-md shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="photo"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="photo"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 "
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h3>Already have an account?</h3>
              <Link to="/login" className="text-blue-600 pl-2">
                Signin{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
