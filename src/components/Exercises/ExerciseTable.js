import React from 'react'

// import dependencies
import MaterialTable from 'material-table';

// import resources

import {ActionSwitchStrings} from '../../res/Strings'

const ExerciseTable = ({exercises,sendHandleChoice, tableMessage}) => {

  const [columns] = React.useState([
      { title: 'Id', field: 'id', type: 'numeric' },
      { title: 'Name', field: 'exerciseName' },
      { title: 'Description', field: 'shortDescription'}
    ])

  function handleEdit (rowData) {
      sendHandleChoice(
        ActionSwitchStrings.ActionSwitchEdit,
         exercises.find(
           exercise => exercise.id === rowData.id))
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