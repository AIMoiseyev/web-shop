import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { withRouter } from '../../HOC/withRouter';
import { connect } from 'react-redux';
import CollectionsOverviewComponent from '../../components/collections-overview/collections-overview.component';
import CollectionPageContainer from '../collection/collection.container';
import { compose } from 'redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
class ShopPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
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
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
export default compose(withRouter, connect(null, mapDispatchToProps))(ShopPage);
