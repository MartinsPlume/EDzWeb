import React from 'react'
import TeacherAssignment from 'components/Assignments/TeacherAssignment'
import StudentAssignment from 'components/Assignments/StudentAssignment'

import ErrorComponent from 'components/ErrorComponent'

// import resources
import {UserRoleStrings} from 'res/Strings'

// controls the view depending on user role
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