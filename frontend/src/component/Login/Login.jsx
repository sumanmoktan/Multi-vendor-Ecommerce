import React, { useState } from 'react'
import {AiOutlineEye,AiFillEyeInvisible} from 'react-icons/ai';
import styles from '../../styles/Style'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
      e.preventDefault();

      await axios.post(`${server}/api/v1/user/login`, {
        email,
        password
      },{withCredentials:true}).then((res)=>{
        toast.success("Login Successfully");
        navigate('/');
        window.location.reload(true);
      }).catch((err)=>{
        toast.error(err.response.data.message);
      })
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <div className="bg-white p-8 rounded-md shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                htmlFor="email"
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
                />{visible ? ( <AiOutlineEye 
                  className='absolute right-2 top-2 cursor-pointer'
                  size={25}
                  onClick={()=>setVisible(false)}
                  />): ( <AiFillEyeInvisible
                    className='absolute right-2 top-2 cursor-pointer'
                    size={25}
                    onClick={()=>setVisible(true)}
                    />)}
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className={`${styles.noramlFlex}`}>
                <input type='checkbox' name='remember-me' id='remember-me' className='h4 w4 text-blue-500 focus:ring-blue-500 border-gray-500 rounded' />
                    <label htmlFor='remember' className='ml-2 block text-sm text-gray-500'>Remember me</label>
              </div>
              <div className='text-sm ml-auto'>
                <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                    Forgot Password
                </a>
              </div>
            </div>
            <div>
              <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 '>
                submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h3>Not have any account?</h3>
              <Link to='/Signup' className='text-blue-600 pl-2'>Sign-Up </Link>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login