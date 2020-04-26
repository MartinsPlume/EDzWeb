import React from 'react'
import { authenticationService } from 'authorization/Authentication';
import StudentHome from './StudentHome'

const HomeSwitch = ({}) => {

    let Output;
    let userRole = sessionStorage.getItem('userRole')
    
    switch (userRole)
    {
        case 'Student':
            Output = (
                <>
                    <StudentHome
                    userRole={userRole}/>
                </>
            )
            break;
        default:
            Output = (
                <>
                User role is {userRole}
                </>
            )
    }
    return Output
}

export default HomeSwitch
