import React, { Component } from 'react'
import MaterialTable from 'material-table';
import {AuthHeader} from '../../authorization/AuthHeader'
import {exercises} from '../../authorization/Contracts'
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

    fetchExercises() {

        const requestOptions = {
            method: 'GET',
            headers: AuthHeader.authHeader()
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
                onClick: (event, rowData) => alert('You pressed ' + rowData.exerciseName)
            },
            {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: (event, rowData) => alert("You want to add a new row")
            }
          ]}
            // editable={{
            //   onRowAdd: newData => {
            //     new Promise()

            //     var headers = new Headers()
            //     headers.append('Authorization', AuthHeader.authHeaderOnlyToken())
            //     headers.append('content-type', 'application/json')

            //     fetch(exercises, {
            //       method: 'POST',
            //       headers: headers,
            //       body: JSON.stringify(newData.exerciseName,newData.exerciseCode, newData.shortDescription)
            //     })
            //   }
            //   }}
            />
            </div>
        )
    }
}

export default ExerciseTable
