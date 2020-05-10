import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

// import resources
import {ExerciseChangeSwitchStrings, Strings, ModalStatusStrings} from '../../res/Strings'

// reactstrap components
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input
  } from "reactstrap";

const EditExercise = ({sendCloseExercise, editExercise, setTableMessage}) => {

    const [exercise, setExercise] = React.useState(editExercise)
    const [exerciseName, SetexerciseName] = React.useState(editExercise.exerciseName)
    const [exerciseShortDescription, SetExerciseShortDescription] = React.useState(editExercise.shortDescription)
    const [exerciseDescription, SetExerciseDescription] = React.useState(editExercise.Description)

    const handleChange = (e) => {
        switch(e.target.id){
            case ExerciseChangeSwitchStrings.ExerciseName:
                SetexerciseName(e.target.value)
                break;

            case ExerciseChangeSwitchStrings.ShortDescription:
                SetExerciseShortDescription(e.target.value)
                break;

            case ExerciseChangeSwitchStrings.Description:
                SetExerciseDescription(e.target.value)
                break;
            
            default:
                break;
        }
    }
    
    const handleDelete = async (e) => {
        e.preventDefault()
        console.log(e)

        const requestOptions = {
            method: 'DELETE',
            headers: ({
                'Authorization' : AuthHeader.authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            })}
        await fetch(
            WebApiRequests.EDzControlExercises + '/' + exercise.exerciseId,
            requestOptions)
            .then(response => setTableMessage(ModalStatusStrings.Deleted)
            )
        sendCloseExercise()
    }

    const addEdit = async (e) => {
        e.preventDefault()
        
        let updateData = exercise
        updateData.exerciseName=exerciseName
        updateData.shortDescription=exerciseShortDescription
        updateData.description=exerciseDescription

        const requestOptions = {
            method: 'PUT',
            headers: ({
                'Authorization' : AuthHeader.authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(updateData)
            }

        await fetch(
            WebApiRequests.EDzControlExercises + '/' + exercise.exerciseId,
            requestOptions)
            .then(setTableMessage(ModalStatusStrings.Updated))
        sendCloseExercise()
    }
    
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>
                        <i
                            aria-hidden={false}
                            className='nc-icon nc-paper'
                            />
                            {Strings.EditTextWithSpaceForIcon}
                        </h1>
                    </Col>                    
                    <Col>
                        <h2>{Strings.ExerciseText}</h2>
                    </Col>
                    <Col className="form-row ">
                        <Button
                            onClick= {(e) => sendCloseExercise()}
                            className="btn btn-round mr-1"
                            color="warning"
                            type="button"
                            >
                        <i
                            aria-hidden={false}
                            className='nc-icon nc-button-power'
                            />
                            {Strings.CloseTextWithSpaceForIcon}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <div>
                <Form onSubmit = {addEdit}>
                    <FormGroup>
                        <h3>{Strings.ExerciseText}</h3>
                        <Input type="text" defaultValue={exercise.exerciseName}  onChange = {handleChange}  name="ExerciseName" id={ExerciseChangeSwitchStrings.ExerciseName} placeholder={Strings.ExerciseTextHint}/>
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.ShortDescriptionText}</h3>
                        <Input defaultValue={exercise.shortDescription} onChange = {handleChange} type="text" name="ShortDescription" id={ExerciseChangeSwitchStrings.ShortDescription} placeholder ={Strings.ExerciseShortDescriptionHint} />
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.DescriptionText}</h3>
                        <Input defaultValue={exercise.description} onChange = {handleChange} type="textarea" name="Description" id={ExerciseChangeSwitchStrings.Description} placeholder ={Strings.ExerciseDescriptionHint}/>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button
                                onClick={handleDelete}
                                className="btn btn-round mr-1"
                                color="danger"
                                type="button"
                                >
                                {Strings.DeleteText}
                            </Button>
                        </Col>
                        <Col className="form-row ">
                            <Button
                                className="btn btn-round mr-1"
                                color="success"
                                type="submit"
                                >
                                {Strings.SaveText}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default EditExercise