import React from 'react'
import NewExercise from './NewExercise'
import EditExercise from './EditExercise'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

const ExerciseActionSwitch = ({
    type,
    sendEditSaveDeleteHappened,
    editExercise,
    setTableMessage}) => 
    {

    let Output;
    switch (type)
    {
        case ActionSwitchStrings.New:
            Output = (
                <>
                    <NewExercise 
                    sendCloseExercise={sendEditSaveDeleteHappened}
                    setTableMessage={setTableMessage}
                    />
                </>
            )
            break;
        case ActionSwitchStrings.Edit:
            Output = (
                <>
                    <EditExercise
                    editExercise={editExercise}
                    sendCloseExercise={sendEditSaveDeleteHappened}
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