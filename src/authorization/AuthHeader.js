import { authenticationService } from './Authentication';

export function authHeader() {
    // return authorization header with jwt token

    const currentUser = JSON.stringify(authenticationService.currentUserValue)

    if (currentUser) {
        return { Authorization: `Bearer ${JSON.parse(currentUser).accessToken}` };
    } else {
        return {};
    }
}