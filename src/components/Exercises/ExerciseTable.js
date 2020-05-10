import React, { Component } from 'react'

// import dependencies
import MaterialTable from 'material-table';
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

// import resources

import {ActionSwitchStrings, Strings, ModalStatusStrings} from '../../res/Strings'

// reactstrap components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";


export class ExerciseTable extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
          exercises: [],
          columns: [
            { title: 'Id', field: 'exerciseId', type: 'numeric' },
            { title: 'Name', field: 'exerciseName' },
            { title: 'Description', field: 'shortDescription'}
          ]
          }
        }

    componentDidMount(){
        this.fetchExercises()
    }

    handleEdit(rowData){
      this.props.sendHandleChoice(
        ActionSwitchStrings.ActionSwitchEditExercise,
         this.state.exercises.find(
           exercise => exercise.exerciseId === rowData.exerciseId))
    }

    fetchExercises() {
        const requestOptions = {
            method: 'GET',
            headers: AuthHeader.authHeader()
        };

        fetch(
          WebApiRequests.EDzControlExercises,
          requestOptions)
          .then(response => response.json())
          .then(data => {
            this.setState({
                exercises: data
            })
          })
          .catch(error => this.setState({ error, isLoading: false }));
      }

      renderTableData(){
        const state = this.state;
        const { exercises } = state;
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

    render() {
        return (
            <div>
              <div>
                <MaterialTable
                title="Exercise table"
                columns={this.state.columns}
                data={this.renderTableData()}        
                options={{
                  search: true
                }}
                actions = {[{
                      icon: 'edit',
                      tooltip: 'Edit exercise',
                      onClick: (event, rowData) =>
                      this.handleEdit(rowData)
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add exercise',
                    isFreeAction: true,
                    onClick: (event) =>
                    this.props.sendHandleChoice(ActionSwitchStrings.ActionSwitchNewExercise,null)
                  }
                  ]}
                />
              </div>
              
            </div>
        )
    }
}

export default ExerciseTable
