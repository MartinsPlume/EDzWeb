import React from 'react'

// import dependencies
import ExercisesList from './ExercisesList';

import ExerciseView from 'components/Exercises/ExerciseView';



// import resources

import {ActionSwitchStrings} from '../../res/Strings'

const ExerciseListSwitch = ({
    type,
    exercises,
    exercise,
    sendClose,
    handleChoice}) => {

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
                    <ExercisesList
                    exercises = {exercises}
                    handleChoice = {handleChoice}
                    />
                </>
            )
            break;

        default:
            Output=null
            break;
    }
    
    return Output
}

export default ExerciseListSwitch
