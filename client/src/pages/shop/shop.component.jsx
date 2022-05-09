import React, { lazy, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { withRouter } from '../../HOC/withRouter';
import { connect } from 'react-redux';
// import CollectionsOverviewComponent from '../../components/collections-overview/collections-overview.component';
// import CollectionPageContainer from '../collection/collection.container';
import { compose } from 'redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverviewComponent = lazy(() =>
  import('../../components/collections-overview/collections-overview.component')
);
const CollectionPageContainer = lazy(() =>
  import('../collection/collection.container')
);

const ShopPage = ({ fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<CollectionsOverviewComponent />} />
          <Route
            path={`/:collectionId`}
            element={<CollectionPageContainer />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
export default compose(withRouter, connect(null, mapDispatchToProps))(ShopPage);
