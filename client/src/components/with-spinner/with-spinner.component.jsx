import React from 'react';
import Spinner from '../spinner/spinner.component';

function WithSpinner(WrappedComponent) {
  function ComponentWithSpinnerProp({ isLoading, ...otherProps }) {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
  }
  return ComponentWithSpinnerProp;
}

export default WithSpinner;
