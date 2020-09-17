import { call, put, takeLatest } from 'redux-saga/effects'
import { auth } from '../action/actiontypes'
import { AuthSuccessAction, AuthErrorAction } from '../action/actions'
import { loginApi } from '../../api/loginApi';
export function* fetchUser(action) {
    try {
        // fetch the data  from the action if the data is required as params for the api call
        const { userLoginDetails } = action.data;
        // use call effect of redux-saga to call the api
        const user = yield call(loginApi, userLoginDetails);
        if (user) {
            // pass the data fetched from api to the required action using put
            yield put(AuthSuccessAction(user));
        }
    } catch (err) {
        // you can handle error handling by creating an action and passing err data
        yield put(AuthErrorAction(err));
    }

}

export function* fetchUserSaga() {
    // takeLatest allows only one instance of fetchuser task to run at any moment.
    yield takeLatest(auth.AUTH_USER_REQUESTED, fetchUser);
}

export default fetchUserSaga;