import React from 'react'
import TeacherAssignment from './TeacherAssignment'
import StudentAssignment from './StudentAssignment'

import ErrorComponent from '../ErrorComponent'

// import resources
import {UserRoleStrings} from '../../res/Strings'

const AssignmentSwitch = () => {
    let Output;
        let userRole = sessionStorage.getItem('userRole')
    
    switch (userRole)
    {
        case UserRoleStrings.UserStudent:
            Output = (
                <>
                    <StudentAssignment/>
                </>
            )
            break;
        case UserRoleStrings.UserTeacher:
            Output = (
                <>
                    <TeacherAssignment/>
                </>
            )
            break;
        default:
            Output = (
                <ErrorComponent/>
            )
    }

    return Output;
}

export default AssignmentSwitch
