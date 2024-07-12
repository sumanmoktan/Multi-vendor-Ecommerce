import React from 'react'
import CheckoutStep from '../component/Checkout/CheckoutStep'
import Footer from '../component/Layout/Footer'
import Header from '../component/Layout/Header'
import Payment from "../component/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutStep active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage