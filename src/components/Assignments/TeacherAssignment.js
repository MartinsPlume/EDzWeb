import React from 'react'

// import dependencies
import AssignmentTable from 'components/Assignments/AssignmentTable'
import AssignmentActionSwitch from 'components/Assignments/AssignmentActionSwitch'
import {AuthHeader} from 'authorization/AuthHeader'
import {WebApiRequests} from 'authorization/Contracts'

// import resources
import {ActionSwitchStrings} from 'res/Strings'

function TeacherAssignment() {

    // Define values passed as props to children.
    // fetch
    const [exercises, setExercises] = React.useState([])
    const [assignments,setAssignments] = React.useState([])
    const [students,setStudents] = React.useState([])

    // assigned when user presses edit in the table
    const [assignment,setAssignment] = React.useState()


    // switch variable
    const [assignmentSwitchProperty,setAssignmentSwitchProperty] = React.useState('idle')

    // on component update fetch values.
    // TODO find more efficient way. Update only when neccessary.
    React.useEffect(() =>{
        fetchStudents()
        fetchAssignments()
        fetchExercises()
      },[])

    // handle users action in the table
    function handleChoice(choice, editAssignment){

        if (assignmentSwitchProperty !== choice) {
            setAssignmentSwitchProperty(choice)
            setAssignment(editAssignment)
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

    async function fetchStudents() {
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader.authHeader()
    };

    // get student list for form
    await fetch(
        WebApiRequests.EDzControlGetStudents,
        requestOptions)
        .then(response => response.json())
        .then(data => {setStudents(data)
        })
        .catch(error => console.log({ error, isLoading: false }));
    }

    
    return (
        // render Assignment editing form
        // render Assignment table
        <div>
            <AssignmentActionSwitch
            students = {students}
            exercises = {exercises}
            type = {assignmentSwitchProperty}
            sendClose = {setAssignmentSwitchIdle}
            editAssignment = {assignment}
            />
            <AssignmentTable
            assignments = {assignments}
            sendHandleChoice={handleChoice}
            refreshTable={fetchAssignments}
            />
            
        </div>
    )
}

export default TeacherAssignment