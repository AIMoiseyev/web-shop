import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { withRouter } from '../../HOC/withRouter';
import { collection, getDocs } from 'firebase/firestore';
import {
  convertedCollectionsSnapshotToMap,
  db
} from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
    this.unsubscribeFromSnapshot = null;
  }

  componentDidMount() {
    const { updateCollections } = this.props;

    getDocs(collection(db, 'collections')).then((snapShot) => {
      const collectionsMap = convertedCollectionsSnapshotToMap(snapShot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { location } = this.props.router;
    const { loading } = this.state;
    console.log(location, this.props);
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={
              <CollectionsOverviewWithSpinner
                isLoading={loading}
                {...this.props}
              />
            }
          />
          <Route
            path={`/:collectionId`}
            element={
              <CollectionsPageWithSpinner isLoading={loading} {...this.props} />
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap))
});
export default withRouter(connect(null, mapDispatchToProps)(ShopPage));
