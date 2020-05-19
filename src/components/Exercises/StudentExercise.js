import React from 'react'

// import dependencies
import ExerciseListSwitch from 'components/Exercises/ExerciseListSwitch'

import {AuthHeader} from 'authorization/AuthHeader'
import {WebApiRequests} from 'authorization/Contracts'

// import resources
import {ActionSwitchStrings} from 'res/Strings'

// Main student's component of exercise. Controls the view on assignment route
function StudentExercise() {
    // Define values passed as props to children.
    // fetch
    const [exercise,setExercise] = React.useState()
    const [exercises,setExercises] = React.useState([])

    // switch variable
    const [assignmentSwitchProperty,setAssignmentSwitchProperty] = React.useState(ActionSwitchStrings.ActionSwitchIdle)

    // on component update fetch values.
    React.useEffect(() =>{
        fetchExercises()
      },[])

    // get exercises with API request
    // TODO find how to extract this method out of all on seperate API request file
    async function fetchExercises (){
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader.authHeader()
    };

    await fetch(
        WebApiRequests.EDzControlExercises,
        requestOptions)
        .then(response => response.json())
        .then(data => {setExercises(data)
        })
        .catch(error => console.log({ error, isLoading: false }));
    }

    function handleChoice(choice, exerciseId){
        if (assignmentSwitchProperty !== choice) {
            setAssignmentSwitchProperty(choice)
            setExercise(exercises.find(
                exercise => exercise.id === exerciseId
            ))
        }
        else {
            setAssignmentSwitchIdle()
        }
    }

    // Close the editing form
    function setAssignmentSwitchIdle(){
        setAssignmentSwitchProperty(ActionSwitchStrings.ActionSwitchIdle)
    }

    // render ExerciseListSwitch renders either list or exercise depending on user's choice
    return (
        <div>
            <ExerciseListSwitch
            type = {assignmentSwitchProperty}
            exercises = {exercises}
            exercise = {exercise}
            sendClose = {setAssignmentSwitchIdle}
            handleChoice = {handleChoice}
            />
        </div>
    )
}

export default StudentExercise