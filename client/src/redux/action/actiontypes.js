
// action types are string constants that defines the action creator; based on action types stated respective action creators will be called.

export const auth = {
    AUTH_USER_REQUESTED: 'AUTH_USER_REQUESTED',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_SUCCESS_ASYNC: 'AUTH_SUCCESS_ASYNC',
    AUTH_ERROR: 'AUTH_ERROR',
};

export const postlist = {
    POST_LIST_DATA_REQUESTED: 'POST_LIST_DATA_REQUESTED',
    POST_LIST_DATA: 'POST_LIST_DATA',
    POST_LIST_DATA_ERROR: 'POST_LIST_DATA_ERROR',
};

export const reload = "RELOAD"
export const pendingTab = "PENDINGTAB"