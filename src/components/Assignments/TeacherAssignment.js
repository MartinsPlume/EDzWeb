import React from 'react'

// import dependencies
import AssignmentTable from './AssignmentTable'
import AssignmentActionSwitch from './AssignmentActionSwitch'
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

// import resources
import {ActionSwitchStrings, ModalStatusStrings} from '../../res/Strings'

function TeacherAssignment() {

    const [assignment,setAssignment] = React.useState()
    const [exercises, setExercises] = React.useState([])
    const [assignments,setAssignments] = React.useState([])
    const [assignmentSwitchProperty,setAssignmentSwitchProperty] = React.useState('idle')
    const [tableMessage, setTableMessage] = React.useState(ModalStatusStrings.ModalIdle)
    const [students,setStudents] = React.useState()

    React.useEffect(() =>{
        fetchStudents()
        fetchAssignments()
        fetchExercises()
      },[])

    function handleChoice(choice, editAssignment){

        if (assignmentSwitchProperty !== choice) {
            setAssignmentSwitchProperty(choice)
            setAssignment(editAssignment)
        }
        else {
            setAssignmentSwitchIdle()
        }
    }

    function setAssignmentSwitchIdle(){
        setAssignmentSwitchProperty(ActionSwitchStrings.Idle)
        fetchAssignments()
    }

    function setTableModal(message){
        setTableMessage(message)
    }

    function fetchAssignments (){
        const requestOptions = {
            method: 'GET',
            headers: AuthHeader.authHeader()
        };
  
        fetch(
          WebApiRequests.EDzControlTeacherAssignments,
          requestOptions)
          .then(response => response.json())
          .then(data => {setAssignments(data)
          })
          .catch(error => console.log({ error, isLoading: false }));
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

    function fetchStudents() {
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader.authHeader()
    };

    fetch(
        WebApiRequests.EDzControlGetStudents,
        requestOptions)
        .then(response => response.json())
        .then(data => {setStudents(data)
        })
        .catch(error => console.log({ error, isLoading: false }));
    }

    return (
        <div>
            <AssignmentActionSwitch
            students = {students}
            exercises = {exercises}
            type = {assignmentSwitchProperty}
            sendClose = {setAssignmentSwitchIdle}
            editAssignment = {assignment}
            setTableMessage={setTableModal}
            />
            <AssignmentTable
            assignments = {assignments}
            sendHandleChoice={handleChoice}
            tableMessage={tableMessage}
            />
            
        </div>
    )
}

export default TeacherAssignment