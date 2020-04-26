import React from 'react'
import StudentHome from './StudentHome'
import TeacherHome from './TeacherHome'
import ErrorComponent from '../ErrorComponent'

const HomeSwitch = ({}) => {

    let Output;
    let userRole = sessionStorage.getItem('userRole')
    
    switch (userRole)
    {
        case 'Student':
            Output = (
                <>
                    <StudentHome/>
                </>
            )
            break;
        case 'Teacher':
        Output = (
            <>
                <TeacherHome/>
            </>
        )
        break;
        default:
            Output = (
                <ErrorComponent/>
            )
    }
    return Output
}

export default HomeSwitch
