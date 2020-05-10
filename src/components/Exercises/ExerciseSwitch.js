import React from 'react'
import StudentExercise from './StudentExercise'
import TeacherExercise from './TeacherExercise'
import ErrorComponent from '../ErrorComponent'

// import resources
import {UserRoleStrings} from '../../res/Strings'

const ExerciseSwitch = () => {

        let Output;
        let userRole = sessionStorage.getItem('userRole')
    
    switch (userRole)
    {
        case UserRoleStrings.UserStudent:
            Output = (
                <>
                    <StudentExercise/>
                </>
            )
            break;
        case UserRoleStrings.UserTeacher:
            Output = (
                <>
                    <TeacherExercise/>
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

export default ExerciseSwitch