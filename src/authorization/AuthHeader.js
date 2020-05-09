import { authenticationService } from './Authentication';

export const AuthHeader = {
    authHeader,
    authHeaderOnlyToken
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