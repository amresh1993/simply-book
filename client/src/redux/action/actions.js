import { auth, postlist, reload, pendingTab } from './actiontypes';

//based on action types ; action creator is called. These send data from your application to store.
export function userDataRequested(userLoginDetails) {
    return {
        type: auth.AUTH_USER_REQUESTED, // type of action being performed
        data: { userLoginDetails },
    };
}

export const AuthSuccessAction = data => {
    return {
        type: auth.AUTH_SUCCESS,
        payload: data, // payload is the data we need to pass to the reducer
    };
};

export const AuthErrorAction = data => {
    return {
        type: auth.AUTH_ERROR,
        payload: data,
    };
};

export const postListDataRequested = data => {
    return {
        type: postlist.POST_LIST_DATA_REQUESTED,
        data: data, // you can name the attribute as you like, map it to reducer with same name.
    };
};
export const postListData = postListData => {
    return {
        type: postlist.POST_LIST_DATA,
        payload: postListData,
    };
};
export const postListDataError = data => {
    return {
        type: postlist.POST_LIST_DATA_ERROR,
        payload: data,
    };
};


export const reloadAction = data => {
    return {
        type: reload,
        data: data
    }
}
export const pendingTabAction = data => {
    return {
        type: pendingTab,
        data: data
    }
}