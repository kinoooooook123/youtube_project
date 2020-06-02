import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';
export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data)
    // server 로 부터 response된 data를 가져와서 state 로 넣어준다 action은 type 과 값을 줘야한다 객체로...
    //현재 loginUser라는 함수를 만들어서 저기다가 넣어준것임
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data)
    // server 로 부터 response된 data를 가져와서 state 로 넣어준다 action은 type 과 값을 줘야한다 객체로...
    //현재 loginUser라는 함수를 만들어서 저기다가 넣어준것임
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data)
    
    return {
        type: AUTH_USER,
        payload: request
    }
}