import React from 'react'

// import dependencies
import {AuthHeader} from 'authorization/AuthHeader'
import {WebApiRequests} from 'authorization/Contracts'
import AssignmentListSwitch from 'components/Assignments/AssignmentListSwitch'

// import resources
import {ActionSwitchStrings} from 'res/Strings'

// Main student's component of assignment. Controls the view on assignment route
function StudentAssignment() {

    // Define values passed as props to children.
    // fetch
    const [assignments,setAssignments] = React.useState([])
    const [exercises,setExercises] = React.useState([])

    // assigned when user presses edit in the table
    const [exercise,setExercise] = React.useState()

    // switch variable
    const [assignmentSwitchProperty,setAssignmentSwitchProperty] = React.useState(ActionSwitchStrings.ActionSwitchIdle)

    // on component update fetch values.
    // TODO find more efficient way. Update only when neccessary.
    React.useEffect(() =>{
        fetchAssignments()
        fetchExercises()
      },[])

    // handle users action in the table
    function handleChoice(choice, id){
        if (assignmentSwitchProperty !== choice) {
            setAssignmentSwitchProperty(choice)
            setExercise(exercises.find(
                exercise => exercise.id === id
            ))
        }
        else {
            setAssignmentSwitchIdle()
        }
    }

    // Close the editing form
    function setAssignmentSwitchIdle(){
        setAssignmentSwitchProperty(ActionSwitchStrings.ActionSwitchIdle)
        fetchAssignments()
    }

    // get exercises with API request
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

    // get assignments with API request
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

    // render AssignmentListSwitch renders either list or exercise depending on user's choice
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