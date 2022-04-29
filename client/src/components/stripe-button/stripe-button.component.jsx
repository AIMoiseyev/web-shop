import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51Kj655FLdk9AtawoGqBV5ojRUVOYDoGdbrbZBF4FtpoKNXDFCNox2TbWyp4X4ooiVBZO7lUWShu7q9rZh90trDoY005FL5bJ6A';

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then((response) => {
        console.log(response);
        alert('Payment Successful');
      })
      .catch((error) => {
        console.log('Payment error', JSON.parse(error));
        alert('There was an issue with your payment.');
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Web Shop"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
