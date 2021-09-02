import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { Config } from './../Config/index.js';

export function registerUser(dataToSubmit){
    console.log('axios')
    console.log(dataToSubmit)
    console.log(`${Config.USER_API}/register`)
    const request = axios.post(`${Config.USER_API}/register`, dataToSubmit)
        .then(response => response.data)
        .catch((err) => {
            console.log(err)
        })
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${Config.USER_API}/login`, dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${Config.USER_API}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${Config.USER_API}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

