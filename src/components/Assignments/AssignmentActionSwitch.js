import React from 'react'
import AssignmentNew from 'components/Assignments/AssignmentNew'
import AssignmentEdit from 'components/Assignments/AssignmentEdit'

// import resources
import {ActionSwitchStrings} from 'res/Strings'

// Control assignment editing form
const AssignmentActionSwitch = ({
    students,
    exercises,
    type,
    sendClose,
    editAssignment}) => 
    {

    let Output;
    switch (type)
    {
        case ActionSwitchStrings.ActionSwitchNew:
            Output = (
                <>
                    <AssignmentNew 
                    students={students}
                    exercises = {exercises}
                    sendClose={sendClose}
                    />
                </>
            )
            break;
        case ActionSwitchStrings.ActionSwitchEdit:
            // get edit assignment before render component. Null reference if accessed inside component
            let editAssignmentExercise = exercises.find(exercise => exercise.id===editAssignment.exerciseId).exerciseName
            Output = (
                <>
                    <AssignmentEdit
                    editAssignment = {editAssignment}
                    students={students}
                    exercises = {exercises}
                    sendClose={sendClose}
                    editAssignmentExercise = {editAssignmentExercise}
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

export default AssignmentActionSwitch