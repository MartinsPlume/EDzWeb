import React from 'react'

// import dependencies
import ExerciseTable from './ExerciseTable'
import ExerciseActionSwitch from './ExerciseActionSwitch'
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

function TeacherExercise() {
    const [exercise,setExercise] = React.useState()
    const [exercises, setExercises] = React.useState([])
    const [exerciseSwitchProperty,setExerciseSwitchProperty] = React.useState('idle')

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
        setExerciseSwitchProperty(ActionSwitchStrings.ActionSwitchIdle)
        fetchExercises()
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
            sendClose={setExerciseSwitchIdle}
            editExercise = {exercise}
            />
            <ExerciseTable
            exercises = {exercises}
            sendHandleChoice={handleChoice}
            refreshTable = {fetchExercises}
            />
        </div>
    )
}

export default TeacherExercise
