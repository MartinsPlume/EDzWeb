import React from 'react'
import StudentExercise from './StudentExercise'
import TeacherExercise from './TeacherExercise'
import ErrorComponent from '../ErrorComponent'

const ExerciseSwitch = () => {

        let Output;
        let userRole = sessionStorage.getItem('userRole')
    
    switch (userRole)
    {
        case 'Student':
            Output = (
                <>
                    <StudentExercise
                    userRole={userRole}/>
                </>
            )
            break;
        case 'Teacher':
            Output = (
                <>
                    <TeacherExercise
                    userRole={userRole}/>
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
