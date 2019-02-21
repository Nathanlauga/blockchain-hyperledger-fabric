import {
    ADD_NOTIFICATION
} from '../actions/notifications/types';

const initialState = {
    event: {}
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return { ...state, event: action.payload };
        default:
            return state;
    }
};


export default notificationsReducer;