import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import Header from './components/header/header.component';
import SignInAndSignUpComponent from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import { selectCurrentUser } from './redux/user/user.selector';
import ShopPage from './pages/shop/shop.component';
import Checkout from './pages/checkout/checkout.component';

import { GlobalStyle } from './global.styles';

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/*" element={<ShopPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/signin"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <SignInAndSignUpComponent />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
