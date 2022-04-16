import React, { useEffect } from 'react';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpComponent from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import Checkout from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
