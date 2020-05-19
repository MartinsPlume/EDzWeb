import React from 'react'

// import dependencies
import ExerciseTable from 'components/Exercises/ExerciseTable'
import ExerciseActionSwitch from 'components/Exercises/ExerciseActionSwitch'
import {AuthHeader} from 'authorization/AuthHeader'
import {WebApiRequests} from 'authorization/Contracts'

// import resources
import {ActionSwitchStrings} from 'res/Strings'

function TeacherExercise() {
    // Define values passed as props to children.
    // fetch
    const [exercise,setExercise] = React.useState()
    const [exercises, setExercises] = React.useState([])

    // assigned when user presses edit in the table
    const [exerciseSwitchProperty,setExerciseSwitchProperty] = React.useState('idle')

    // on component update fetch values.
    React.useEffect(() =>{
        fetchExercises()
      },[])

    // handle users action in the table
    function handleChoice(choice, editExercise){

        if (exerciseSwitchProperty !== choice) {
            setExerciseSwitchProperty(choice)
            setExercise(editExercise)
        }
        else {
            setExerciseSwitchIdle()
        }
    }
    
    // Close the editing form
    function setExerciseSwitchIdle(){
        setExerciseSwitchProperty(ActionSwitchStrings.ActionSwitchIdle)
        fetchExercises()
    }

    // get exercises with API request
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
        // render Exercise editing form
        // render Exercise table
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
