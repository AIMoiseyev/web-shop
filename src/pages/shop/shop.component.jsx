import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { withRouter } from '../../HOC/withRouter';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import CollectionsOverviewComponent from '../../components/collections-overview/collections-overview.component';
import CollectionPageContainer from '../collection/collection.container';
import { compose } from 'redux';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route path="/" element={<CollectionsOverviewComponent />} />
          <Route
            path={`/:collectionId`}
            element={<CollectionPageContainer />}
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionsStartAsync())
});
export default compose(withRouter, connect(null, mapDispatchToProps))(ShopPage);
