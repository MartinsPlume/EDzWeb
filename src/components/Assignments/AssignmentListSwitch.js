import React from 'react'

// import dependencies
import AssignmentList from './AssignmentList'

// import resources
import {ActionSwitchStrings} from 'res/Strings'
import ExerciseView from 'components/Exercises/ExerciseView';

// Switches between views on assignment list and exercise
const AssignmentListSwitch = ({
    type,
    exercise,
    sendClose,
    assignments,
    handleChoice}) => {

    let Output;
    switch (type)
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
                    <AssignmentList
                    assignments = {assignments}
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

export default AssignmentListSwitch