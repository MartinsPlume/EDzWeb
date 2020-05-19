import React from 'react'

// import dependencies
import ExerciseNew from 'components/Exercises/ExerciseNew';
import ExerciseEdit from 'components/Exercises/ExerciseEdit';

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

// Control exercise editing form
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
            // get instruction video before render component. 
            //Null reference if accessed inside component should empty value if no exercises to choose from
            // TODO add default user in backend for solution with user
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