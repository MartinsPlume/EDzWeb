import { BehaviorSubject } from 'rxjs';
import { EDzControlLogin, EDzControlRole} from './JWTConfig';
import { handleResponse } from './HandleResponse';
import jwt_decode from 'jwt-decode'

const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));
const currentUserRole = new BehaviorSubject(sessionStorage.getItem('userRole'))

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    get currentUserRole () {return currentUserRole.var}
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
    };

    return fetch(EDzControlLogin, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('userRole', jwt_decode(JSON.stringify(user)).UserRole);
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userRole');
    currentUserSubject.next(null);
}