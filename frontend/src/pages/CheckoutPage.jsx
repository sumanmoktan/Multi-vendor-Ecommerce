import React from 'react'
import Header from '../component/Layout/Header'
import CheckoutStep from "../component/Checkout/CheckoutStep";
import Checkout from "../component/Checkout/Checkout";
import Footer from '../component/Layout/Footer';

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutStep active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
