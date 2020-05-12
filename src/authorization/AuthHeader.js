import { authenticationService } from './Authentication';
import jwt_decode from 'jwt-decode'

export const AuthHeader = {
    authHeader,
    authHeaderOnlyToken,
    authHeaderUser
};

function authHeader() {
    // return authorization header with jwt token
    let currentUserToken = authenticationService.currentUserValue.accessToken
    if (currentUserToken) {
        return { Authorization: `Bearer ${currentUserToken}` };
    } else {
        return {};
    }
}

function authHeaderOnlyToken() {
    // return authorization header with jwt token
    let currentUserToken = authenticationService.currentUserValue.accessToken
    if (currentUserToken) {
        return ('Bearer ' + currentUserToken) ;
    } else {
        return {};
    }
}

function authHeaderUser(){
    return jwt_decode(authenticationService.currentUserValue.accessToken).sub
}