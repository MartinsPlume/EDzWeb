import { BehaviorSubject } from 'rxjs';
import {WebApiRequests} from './Contracts';
import { handleLoginResponse, handleRegisterResponse } from './HandleResponse';
import jwt_decode from 'jwt-decode'

// Used values from session storage
const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));
const currentUserRoleSubject = new BehaviorSubject(sessionStorage.getItem('userRole'))

// export authenticationService
export const authenticationService = {
    login,
    register,
    logout,
    currentUser: currentUserSubject.asObservable(),
    currentUserRole: currentUserRoleSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    get currentUserRoleValue () {return currentUserRoleSubject.value}
};

// Handle login
async function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
    };

    return await fetch(
        WebApiRequests.EDzControlLogin,
        requestOptions)
        .then(handleLoginResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('userRole', jwt_decode(JSON.stringify(user)).UserRole);
            currentUserSubject.next(user);
            return user;
        });
}

// Handle registration
async function register (email, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
    };
    
    return await fetch(
        WebApiRequests.EDzControlRegister,
        requestOptions)
        .then(handleRegisterResponse)
}

// Handles logging out
function logout() {
    // remove user from local storage to log the user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userRole');
    currentUserSubject.next(null);
}