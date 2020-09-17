import { auth, postlist, reload, pendingTab } from '../action/actiontypes';

// initital state is the previous state before the state gets updated
const initialState = JSON.parse(localStorage.getItem('userdata'));

// reducer needs to args state and action
export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case auth.AUTH_SUCCESS:  // based on action the new data is returned 
            return action.payload;
        case auth.AUTH_ERROR:
            return { error: action.payload };
        case auth.AUTH_USER_REQUESTED:
            return state;
        default:
            return state; // returns previous state in default case
    }
};

export const postListReducer = (state = [], action) => {
    switch (action.type) {
        case postlist.POST_LIST_DATA_REQUESTED:
            return action.data;
        case postlist.POST_LIST_DATA:
            return action.payload;
        case postlist.POST_LIST_DATA_ERROR:
            return { error: action.payload };
        default:
            return state;
    }
};


export const reloadReducer = (state = true, action) => {
    switch (action.type) {
        case reload:
            return action.data
        default:
            return state
    }
}
export const pendingTabReducer = (state = { isClick: false, tab: '1' }, action) => {
    switch (action.type) {
        case pendingTab:
            return action.data
        default:
            return state
    }
} 