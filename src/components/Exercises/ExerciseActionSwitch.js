import React from 'react'

// import dependencies
import ExerciseNew from './ExerciseNew';
import ExerciseEdit from './ExerciseEdit';

// import resources
import {ActionSwitchStrings} from '../../res/Strings'


const ExerciseActionSwitch = ({
    type,
    sendClose,
    editExercise}) => 
    {
    let Output;
    
    switch (type)
    {
        case ActionSwitchStrings.ActionSwitchNew:
            Output = (
                <>
                    <ExerciseNew
                    sendClose={sendClose}
                    />
                </>
            )
            break;


        case ActionSwitchStrings.ActionSwitchEdit:
            let instructionVideo = editExercise.hasVideo
            ? editExercise.instructionVideo
            : ''
            Output = (
                <>
                    <ExerciseEdit
                    sendClose={sendClose}
                    editExercise = {editExercise}
                    instructionVideoLink = {instructionVideo}
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

export default ExerciseActionSwitch