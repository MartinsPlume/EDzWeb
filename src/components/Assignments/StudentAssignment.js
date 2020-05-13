import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'
import AssignmentListSwitch from './AssignmentListSwitch'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

function StudentAssignment() {

    const [assignments,setAssignments] = React.useState([])
    const [exercise,setExercise] = React.useState()
    const [exercises,setExercises] = React.useState([])

    const [assignmentSwitchProperty,setAssignmentSwitchProperty] = React.useState(ActionSwitchStrings.ActionSwitchIdle)

    React.useEffect(() =>{
        fetchAssignments()
        fetchExercises()
      },[])

    function handleChoice(choice, exerciseId){

        if (assignmentSwitchProperty !== choice) {
            setAssignmentSwitchProperty(choice)
            setExercise(exercises.find(
                exercise => exercise.exerciseId === exerciseId
            ))
        }
        else {
            setAssignmentSwitchIdle()
        }
    }

    function setAssignmentSwitchIdle(){
        setAssignmentSwitchProperty(ActionSwitchStrings.ActionSwitchIdle)
        fetchAssignments()
    }

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

    async function fetchAssignments (){
        const requestOptions = {
            method: 'GET',
            headers: AuthHeader.authHeader()
        };
  
        await fetch(
          WebApiRequests.EDzControlTeacherAssignments,
          requestOptions)
          .then(response => response.json())
          .then(data => {setAssignments(data)
          })
          .catch(error => console.log({ error, isLoading: false }));
      }

    return (
        <div>
            <AssignmentListSwitch
                type={assignmentSwitchProperty}
                exercise = {exercise}
                sendClose = {setAssignmentSwitchIdle}
                assignments = {assignments}
                handleChoice = {handleChoice}
                />
        </div>
    )
}

export default StudentAssignment
