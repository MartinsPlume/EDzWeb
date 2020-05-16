import React from 'react'

// import dependencies
import ExerciseListSwitch from './ExerciseListSwitch'

import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

function StudentExercise() {
    const [exercise,setExercise] = React.useState()
    const [exercises,setExercises] = React.useState([])
    const [assignmentSwitchProperty,setAssignmentSwitchProperty] = React.useState(ActionSwitchStrings.ActionSwitchIdle)

    React.useEffect(() =>{
        fetchExercises()
      },[])

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

    function setAssignmentSwitchIdle(){
        setAssignmentSwitchProperty(ActionSwitchStrings.ActionSwitchIdle)
    }

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
