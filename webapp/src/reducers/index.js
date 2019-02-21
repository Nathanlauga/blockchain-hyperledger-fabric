import { combineReducers } from 'redux';
import {reducer as formsReducer} from 'redux-form';

// Reducers
import notificationsReducer from './notificationsReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
    form: formsReducer,
    auth: authReducer,
    notif: notificationsReducer
});

export default reducers;