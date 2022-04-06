import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

function WithSpinner(WrappedComponent) {
  function ComponentWithSpinnerProp({ isLoading, ...otherProps }) {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  }
  return ComponentWithSpinnerProp;
}

export default WithSpinner;
