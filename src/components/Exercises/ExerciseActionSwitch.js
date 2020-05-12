import React from 'react'
import NewExercise from './NewExercise'
import EditExercise from './EditExercise'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

const ExerciseActionSwitch = ({
    type,
    sendClose,
    editExercise,
    setTableMessage}) => 
    {

    let Output;
    switch (type)
    {
        case ActionSwitchStrings.ActionSwitchNew:
            Output = (
                <>
                    <NewExercise 
                    sendClose={sendClose}
                    setTableMessage={setTableMessage}
                    />
                </>
            )
            break;
        case ActionSwitchStrings.ActionSwitchEdit:
            Output = (
                <>
                    <EditExercise
                    editExercise={editExercise}
                    sendClose={sendClose}
                    setTableMessage={setTableMessage}
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