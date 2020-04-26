import React from 'react'
import NewExercise from './NewExercise'
import EditExercise from './EditExercise'

const ExerciseActionSwitch = (type,exercise,SendEditSaveDeleteHappened) => {

    let Output;
    switch (type)
    {
        case 'new':
            Output = (
                <>
                    <NewExercise 
                    SendCloseExerciseSwitch={SendEditSaveDeleteHappened}
                    />
                </>
            )
            break;
        case 'edit':
            Output = (
                <>
                    <EditExercise
                    editExercise={exercise}
                    SendCloseExerciseSwitch={SendEditSaveDeleteHappened}
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

export default ExerciseActionSwitch
