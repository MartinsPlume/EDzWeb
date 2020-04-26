import React, { Component } from 'react'
import MaterialTable from 'material-table';
import authHeader from '../../authorization/AuthHeader'
import {exercises} from '../../authorization/Contracts'
import { Button } from 'reactstrap';
export class ExerciseTable extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
          exercises: [],
          columns: [
            { title: 'Id', field: 'exerciseId', type: 'numeric' },
            { title: 'Name', field: 'exerciseName' },
            { title: 'Code', field: 'exerciseCode' },
            { title: 'Description', field: 'shortDescription'}
          ]
          }
        }

    componentDidMount(){
        this.fetchExercises()
    }

    fetchExercises() {

        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        // Where we're fetching data from
        fetch(exercises, requestOptions)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data => {
            this.setState({
                exercises: data
            })
          })
          // Catch any errors we hit and update the app
          .catch(error => this.setState({ error, isLoading: false }));
      }
    
      handleNew = async (newData) =>{
        
      }
    
      renderTableData(){
        const state = this.state;
        const { exercises } = state;
        return exercises.map((exercise) => {
            const {exerciseId ,exerciseName, exerciseCode, shortDescription } = exercise //destructuring
            return (
               {
                exerciseId: exerciseId,
                exerciseName: exerciseName, 
                exerciseCode: exerciseCode,
                ShortDescription: shortDescription
                }
            )
         })
       }

    render() {
        return (
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
                onClick: (event, rowData) => alert('You pressed ' + rowData.id)
            }]}
            editable={{
              onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    {
                      console.log(newData)
                    }
                    resolve()
                  }, 1000)
                })
              }}
            />
            </div>
        )
    }
}

export default ExerciseTable
