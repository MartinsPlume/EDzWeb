import React from 'react'

// import dependencies
import ExerciseTable from './ExerciseTable'
import ExerciseActionSwitch from './ExerciseActionSwitch'

// import resources
import {ActionSwitchStrings, ModalStatusStrings} from '../../res/Strings'

function TeacherExercise() {

    const [exercise,setExercise] = React.useState()
    const [exerciseSwitchProperty,setExerciseSwitchProperty] = React.useState('idle')
    const [tableMessage, setTableMessage] = React.useState(ModalStatusStrings.ModalIdle)

    function handleChoice(choice, editExercise){

        if (exerciseSwitchProperty !== choice) {
            setExerciseSwitchProperty(choice)
            setExercise(editExercise)
        }
        else {
            setExerciseSwitchIdle()
        }
    }
    
    function setExerciseSwitchIdle(){
        setExerciseSwitchProperty(ActionSwitchStrings.Idle)
    }

    function setTableModal(message){
        console.log("The message is " + message)
        setTableMessage(message)
    }
    
    return (
        <div>
            <ExerciseActionSwitch
            type = {exerciseSwitchProperty}
            sendEditSaveDeleteHappened={setExerciseSwitchIdle}
            editExercise = {exercise}
            setTableMessage={setTableModal}
            />
            <ExerciseTable
            sendHandleChoice={handleChoice}
            tableMessage={tableMessage}
            />
        </div>
    )
}

export default TeacherExercise
