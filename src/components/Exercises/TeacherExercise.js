import React from 'react'
import ExerciseTable from './ExerciseTable'
import ExerciseActionSwitch from './ExerciseActionSwitch'
import { Button, Modal } from 'reactstrap';
import {NewExerciseText} from '../../res/strings'
import authHeader from '../../authorization/AuthHeader'
import {getExercises} from '../../authorization/Contracts'

function TeacherExercise() {

    const [exercise,setExercise] = React.useState([])
    const [exerciseSwitchProperty,setexerciseSwitchProperty] = React.useState()
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    // TODO DO we need delete?
    function handleChoice(choice){
        switch (choice) {

            case 'new':
                setexerciseSwitchProperty('new')
                break;
            case 'edit':
                setexerciseSwitchProperty('edit')
                break;
            // case 'delete':
            //     deleteExercise(id)
            //     handleShow()
            //     break;
            default:
                break;
        }
    }
    
    // const deleteExercise = async (id) => {
    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: authHeader()
    //     };

    //     // Where we're fetching data from
    //     fetch(getExercises, requestOptions)
    //       // We get the API response and receive data in JSON format...
    //       .then(response => response.json())
    //       // ...then we update the users state
    //       .then(data => {
    //         this.setState({
    //             exercises: data
    //         })
    //       })
    //       // Catch any errors we hit and update the app
    //       .catch(error => this.setState({ error, isLoading: false }));
    // };

    function EditSaveDeleteHappened(){
        setexerciseSwitchProperty(null)
    }
    
    return (
        <div>
            <ExerciseActionSwitch 
            type = {exerciseSwitchProperty}
            sendEditSaveDeleteHappened={EditSaveDeleteHappened}
            />
            <Button
                onClick = {(e) => handleChoice('new')}
                    className="btn-round mr-1"
                    color="warning"
                    type="button"
                >
                    <i
                            aria-hidden={false}
                            className='nc-icon nc-button-power'
                            />
                    {NewExerciseText}
                </Button>
            <ExerciseTable
            sendHandleChoice={handleChoice}
            />
        </div>
    )
}

export default TeacherExercise
