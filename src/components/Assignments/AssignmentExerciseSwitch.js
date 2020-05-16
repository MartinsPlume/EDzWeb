import React from 'react'

// import dependencies
import ExerciseView from '../Exercises/ExerciseView';

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

const AssignmentExerciseSwitch = ({type, exercise, sendClose}) => {
    let Output;
    switch(type)
    {
        case ActionSwitchStrings.ActionSwitchView:
            Output = (
                <>
                    <ExerciseView 
                    exercise = {exercise}
                    sendClose = {sendClose}
                    />
                </>
            )
            break;

        case ActionSwitchStrings.ActionSwitchIdle:
            Output = (
                <>
                </>
            )
            break;

        default:
            Output=null
            break;
    }
    
    return Output
}

export default AssignmentExerciseSwitch