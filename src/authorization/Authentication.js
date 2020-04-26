import { BehaviorSubject } from 'rxjs';
import { EDzControlLogin,EDzControlRegister} from './Contracts';
import { handleLoginResponse, handleRegisterResponse } from './HandleResponse';
import jwt_decode from 'jwt-decode'

const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));
const currentUserRoleSubject = new BehaviorSubject(sessionStorage.getItem('userRole'))

export const authenticationService = {
    login,
    register,
    logout,
    currentUser: currentUserSubject.asObservable(),
    currentUserRole: currentUserRoleSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    get currentUserRoleValue () {return currentUserRoleSubject.value}
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
    };

    return fetch(EDzControlLogin, requestOptions)
        .then(handleLoginResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('userRole', jwt_decode(JSON.stringify(user)).UserRole);
            currentUserSubject.next(user);
            return user;
        });
}

function register (email, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
    };
    
    return fetch(EDzControlRegister, requestOptions)
        .then(handleRegisterResponse)
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userRole');
    currentUserSubject.next(null);
}