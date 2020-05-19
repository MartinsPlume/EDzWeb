import React from 'react'
import StudentHome from 'components/Home/StudentHome'
import TeacherHome from 'components/Home/TeacherHome'
import ErrorComponent from 'components/ErrorComponent'

const HomeSwitch = () => {

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