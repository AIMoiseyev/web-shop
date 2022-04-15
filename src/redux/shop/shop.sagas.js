import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';
import { collection, getDocs } from 'firebase/firestore';
import {
  convertedCollectionsSnapshotToMap,
  db
} from '../../firebase/firebase.utils';

export function* fetchCollections() {
  try {
    const snapShot = yield getDocs(collection(db, 'collections'));
    const collectionsMap = yield call(
      convertedCollectionsSnapshotToMap,
      snapShot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error));
  }
}

export function* onFetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollections);
}

export function* shopSagas() {
  yield all([call(onFetchCollectionsStart)]);
}
