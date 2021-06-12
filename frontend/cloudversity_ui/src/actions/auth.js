// Tried Asynchronus calls to imitate redux thunk behaviour, but useContext/useReducer doesn't support that perhaps

import { AUTH } from '../actionTypes';
import * as api from '../api/index.js';

export const signin = (formdata, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formdata);

        dispatch({ type: AUTH, data });

        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formdata, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formdata);

        dispatch({ type: AUTH, data });

        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
};
