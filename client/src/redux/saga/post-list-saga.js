import { call, put, takeLatest } from 'redux-saga/effects'
import { postlist } from '../action/actiontypes'
import { postListData, postListDataError } from '../action/actions'
import { handleApi } from '../../api/handleApi';

export function* getPostData(action) {
  try {
    const data = action.data;
    const postData = yield call(handleApi, data);
    yield put(postListData(postData));

  } catch (err) {
    yield put(postListDataError(err));
  }

}

export function* getPostListSaga() {
  yield takeLatest(postlist.POST_LIST_DATA_REQUESTED, getPostData);
}

export default getPostListSaga;