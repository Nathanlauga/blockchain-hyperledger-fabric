import setAuthorizationToken from '../../services/setAuthorizationToken';
import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { addNotification } from '../notifications/index';

import {
    AUTH_USER,
    UNAUTH_USER,
    FETCH_PROFILE,
} from './types';

import { API_URL } from '../../config/index';

export function signup(data, history) {
    return function (dispatch) {
        return axios.post(`${API_URL}/users`, data).then(res => {
            if (res.status === 201) {
                localStorage.setItem('token', res.data.token);
                setAuthorizationToken(res.data.token);
                dispatch({ type: AUTH_USER });
                dispatch(fetchProfile());
                dispatch(addNotification({
                    title: '',
                    message: res.data.message,
                    level: 'success',
                    position: 'tr',
                    autoDismiss: 5
                }));
                history.push('/users/home');
            }
        }).catch(err => {
            if (err.response.status === 422) {
                if (err.response.data.errors) {
                    throw new SubmissionError(err.response.data.errors)
                }
            }
        })
    }
}

export function login(data, history) {
    return function (dispatch) {
        return axios.post(`${API_URL}/users/auth/token`, data).then(res => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                setAuthorizationToken(res.data.token);
                dispatch({ type: AUTH_USER });
                dispatch(fetchProfile());
                dispatch(addNotification({
                    title: '',
                    message: res.data.message,
                    level: 'success',
                    position: 'tr',
                    autoDismiss: 5
                }));
                history.push('/users/home');
            }
        }).catch(err => {
            if (err.response.status === 422) {
                if (err.response.data.errors) {
                    throw new SubmissionError(err.response.data.errors)
                }
            }
        })
    }
}

export function fetchProfile() {
    return function (dispatch) {
        return axios.get(`${API_URL}/users/profile`).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: FETCH_PROFILE,
                    payload: res.data.user
                });
            }
        })
    }
}

export function signout() {
    return function (dispatch) {
        localStorage.removeItem('token');
        setAuthorizationToken(false);
        dispatch({ type: UNAUTH_USER });
        dispatch(addNotification({
            title: '',
            message: "Vous êtes maintenant déconnecté.",
            level: 'success',
            position: 'tr',
            autoDismiss: 5
        }));
    }
}

