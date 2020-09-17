import { all } from 'redux-saga/effects';
import fetchUserSaga from './sagas';
import getPostListSaga from './post-list-saga';

export default function* watchAll() {
    // combine sagas using all ; watchAll will wait for all tasks to finish before terminating the whole task
    yield all([getPostListSaga(), fetchUserSaga()]);
}