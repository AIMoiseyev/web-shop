import React, { lazy, useEffect, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import Header from './components/header/header.component';
// import SignInAndSignUpComponent from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import HomePage from './pages/homepage/homepage.component';
import { selectCurrentUser } from './redux/user/user.selector';
// import ShopPage from './pages/shop/shop.component';
// import Checkout from './pages/checkout/checkout.component';

import { GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const Checkout = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpComponent = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);

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
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
