import React from 'react'

// import dependencies
import MaterialTable from 'material-table';


// import resources

import {ActionSwitchStrings, Strings, ModalStatusStrings} from '../../res/Strings'

const ExerciseTable = ({exercises,sendHandleChoice, tableMessage}) => {

  const [columns] = React.useState([
      { title: 'Id', field: 'exerciseId', type: 'numeric' },
      { title: 'Name', field: 'exerciseName' },
      { title: 'Description', field: 'shortDescription'}
    ])
  const [tableStatus, setTableStatus] = React.useState(tableMessage)

  React.useEffect(() =>{
    setTableStatus(tableMessage)
  },[])

  function handleEdit (rowData) {
      sendHandleChoice(
        ActionSwitchStrings.ActionSwitchEditExercise,
         exercises.find(
           exercise => exercise.exerciseId === rowData.exerciseId))
    }

  function renderTableData(){
    return exercises.map((exercise) => {
        const {exerciseId ,exerciseName, shortDescription } = exercise //destructuring
        return (
            {
            exerciseId: exerciseId,
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
              sendHandleChoice(ActionSwitchStrings.ActionSwitchNewExercise,null)
            }
            ]}
          />
        </div>
        
      </div>
  )
}

export default ExerciseTable
