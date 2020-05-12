import React from 'react'

// import dependencies
import MaterialTable from 'material-table';

// import resources

import {ActionSwitchStrings} from '../../res/Strings'

const AssignmentTable = ({assignments,sendHandleChoice, tableMessage}) => {

  const [columns] = React.useState([
      { title: 'Id', field: 'id', type: 'numeric' },
      { title: 'Name', field: 'userEmail' },
      { title: 'Instruction', field: 'shortInstruction'},
    ])

  function handleEdit (rowData) {
      sendHandleChoice(
        ActionSwitchStrings.ActionSwitchEdit,
        assignments.find(
           assignment => assignment.id === rowData.id))
    }

  function renderTableData(){
    return assignments.map((assignment) => {
        const {id ,userEmail, shortInstruction } = assignment //destructuring
        return (
            {
            id: id,
            userEmail: userEmail, 
            shortInstruction: shortInstruction
            }
        )
      })
    }

  return (
      <div>
        <div>
          <MaterialTable
          title="Assignment table"
          columns={columns}
          data={renderTableData()}        
          options={{
            search: true
          }}
          actions = {[{
                icon: 'edit',
                tooltip: 'Edit assignment',
                onClick: (event, rowData) =>
                handleEdit(rowData)
            },
            {
              icon: 'add',
              tooltip: 'Add assignment',
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

export default AssignmentTable