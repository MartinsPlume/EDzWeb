import React from 'react'
import NewAssignment from './NewAssignment'
import EditAssignment from './EditAssignment'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

const AssignmentActionSwitch = ({
    students,
    exercises,
    type,
    sendClose,
    editAssignment,
    setTableMessage}) => 
    {

    let Output;
    switch (type)
    {
        case ActionSwitchStrings.ActionSwitchNew:
            Output = (
                <>
                    <NewAssignment 
                    students={students}
                    exercises = {exercises}
                    sendClose={sendClose}
                    setTableMessage={setTableMessage}
                    />
                </>
            )
            break;
        case ActionSwitchStrings.ActionSwitchEdit:
            Output = (
                <>
                    <EditAssignment
                    editAssignment = {editAssignment}
                    students={students}
                    exercises = {exercises}
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

export default AssignmentActionSwitch