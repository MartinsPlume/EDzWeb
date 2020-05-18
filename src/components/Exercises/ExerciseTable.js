import React from 'react'

// import dependencies
import MaterialTable from 'material-table';
import {AuthHeader} from 'authorization/AuthHeader'
import {WebApiRequests} from 'authorization/Contracts'

// import resources
import {Strings, ActionSwitchStrings} from 'res/Strings'

// import reacstrap components
import {
  Alert,
  Container
} from "reactstrap";

const ExerciseTable = ({exercises,sendHandleChoice, refreshTable}) => {

  // Define columns
  const [columns] = React.useState([
      { title: 'Id', field: 'id', type: 'numeric' },
      { title: 'Name', field: 'exerciseName' },
      { title: 'Description', field: 'shortDescription'}
    ])

  // Alert handler
  const [alertWarning, setAlertWarning] = React.useState(false);

  // Edit button handler
  function handleEdit (rowData) {
      sendHandleChoice(
        ActionSwitchStrings.ActionSwitchEdit,
         exercises.find(
           exercise => exercise.id === rowData.id))
    }

  // Delete button handler with Delete exercise WEB API request
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
          // if exercise can't be deleted, it means it is used by an assigment
            if (!response.ok) {
                setAlertWarning(true)
            }
            // Refresh table, to update the view for user
            else{
              refreshTable()
            }
        })
  }

  // Render data table from the props
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

  // Layout
  // Render warning on the top in case of failed save
  // Render data table
  // TODO Find out if background picture is necessary. It might contract the view.
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