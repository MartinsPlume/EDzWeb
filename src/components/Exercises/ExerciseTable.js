import React from 'react'

// import dependencies
import MaterialTable from 'material-table';
import {AuthHeader} from 'authorization/AuthHeader'
import {WebApiRequests} from 'authorization/Contracts'

// import resources
import {Strings, ActionSwitchStrings} from '../../res/Strings'

// import reacstrap components
import {
  Alert,
  Container
} from "reactstrap";

const ExerciseTable = ({exercises,sendHandleChoice, refreshTable}) => {

  const [columns] = React.useState([
      { title: 'Id', field: 'id', type: 'numeric' },
      { title: 'Name', field: 'exerciseName' },
      { title: 'Description', field: 'shortDescription'}
    ])

  const [alertWarning, setAlertWarning] = React.useState(false);

  function handleEdit (rowData) {
      sendHandleChoice(
        ActionSwitchStrings.ActionSwitchEdit,
         exercises.find(
           exercise => exercise.id === rowData.id))
    }

  async function handleDelete (e, rowData) {
    e.preventDefault()

    const requestOptions = {
        method: 'DELETE',
        headers: ({
            'Authorization' : AuthHeader.authHeaderOnlyToken(),
            'Content-Type': 'application/json'
        })}
    await fetch(
        WebApiRequests.EDzControlExercises + '/' + rowData.id,
        requestOptions)
        .then(response => {
            if (!response.ok) {
                setAlertWarning(true)
            }
            else{
              refreshTable()
            }
        })
}

  function renderTableData(){
    return exercises.map((exercise) => {
        const {id ,exerciseName, shortDescription } = exercise //destructuring
        return (
            {
            id: id,
            exerciseName: exerciseName, 
            shortDescription: shortDescription
            }
        )
      })
    }

  return (
      <div>
        <div>
          <Alert color="warning" isOpen={alertWarning}>
            <Container>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertWarning(false)}
              >
                <i className="nc-icon nc-simple-remove" />
              </button>
              <span>{Strings.DoNotDeleteUsedExercise}</span>
            </Container>
          </Alert>
      </div>
        <div>
          <MaterialTable
          title="Exercise table"
          columns={columns}
          data={renderTableData()}        
          options={{
            search: true
          }}
          actions = {[{
                icon: 'edit',
                tooltip: 'Edit exercise',
                onClick: (event, rowData) =>
                handleEdit(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Delete exercise',
                onClick: (event, rowData) =>
                handleDelete(event,rowData)
            },
            {
              icon: 'add',
              tooltip: 'Add exercise',
              isFreeAction: true,
              onClick: (event) =>
              sendHandleChoice(ActionSwitchStrings.ActionSwitchNew,null)
            }
            ]}
          />
        </div>
        
      </div>
  )
}

export default ExerciseTable