import React from 'react'

// import dependencies
import ExerciseTable from './ExerciseTable'
import ExerciseActionSwitch from './ExerciseActionSwitch'
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

// import resources
import {ActionSwitchStrings, ModalStatusStrings} from '../../res/Strings'

function TeacherExercise() {

    const [exercise,setExercise] = React.useState()
    const [exercises, setExercises] = React.useState([])
    const [exerciseSwitchProperty,setExerciseSwitchProperty] = React.useState('idle')
    const [tableMessage, setTableMessage] = React.useState(ModalStatusStrings.ModalIdle)

    React.useEffect(() =>{
        fetchExercises()
      },[])

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
        fetchExercises()
    }

    function setTableModal(message){
        setTableMessage(message)
    }

    function fetchExercises (){
        const requestOptions = {
            method: 'GET',
            headers: AuthHeader.authHeader()
        };
  
        fetch(
          WebApiRequests.EDzControlExercises,
          requestOptions)
          .then(response => response.json())
          .then(data => {setExercises(data)
          })
          .catch(error => console.log({ error, isLoading: false }));
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
            exercises = {exercises}
            sendHandleChoice={handleChoice}
            tableMessage={tableMessage}
            />
        </div>
    )
}

export default TeacherExercise
