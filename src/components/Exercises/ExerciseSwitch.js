import React from 'react'
import StudentExercise from './StudentExercise'
import TeacherExercise from './TeacherExercise'
import ErrorComponent from '../ErrorComponent'

// import resources
import {UserRoleStrings} from '../../res/Strings'

// Renders component depending on the user
const ExerciseSwitch = () => {

    // define output variable
    let Output;
    // get user value
    let userRole = sessionStorage.getItem('userRole')
    
    // Initialize Output depending on the user role
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

    // return defined and initialized Output component
    return Output;
}

export default ExerciseSwitch