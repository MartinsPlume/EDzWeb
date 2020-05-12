import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

// import resources
import {Strings, ExerciseChangeSwitchStrings, ModalStatusStrings} from '../../res/Strings'

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

const NewExercise = ({sendCloseExercise, setTableMessage}) => {

    const [exerciseName, SetexerciseName] = React.useState()
    const [exerciseShortDescription, SetExerciseShortDescription] = React.useState()
    const [exerciseDescription, SetExerciseDescription] = React.useState()

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

    const addNew = async (e) => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: ({
                'Authorization' : AuthHeader.authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ 
                'ExerciseName' : exerciseName,
                'ShortDescription' : exerciseShortDescription,
                'Description' : exerciseDescription
             })
        };
        await fetch(
            WebApiRequests.EDzControlExercises,
            requestOptions)
            .then(response => setTableMessage(ModalStatusStrings.ModalAdded));
        
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
                            {Strings.NewTextWithSpaceForIcon}
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
                            className='nc-icon nc-simple-remove'
                            />
                            {Strings.CloseTextWithSpaceForIcon}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <div>
                <Form onSubmit = {addNew}>
                    <FormGroup>
                        <h3>{Strings.ExerciseText}</h3>
                        <Input onChange = {handleChange} type="text" name="ExerciseName" id={ExerciseChangeSwitchStrings.ExerciseName} placeholder={Strings.ExerciseTextHint}/>
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.ShortDescriptionText}</h3>
                        <Input onChange = {handleChange} type="text" name="ShortDescription" id={ExerciseChangeSwitchStrings.ShortDescription} placeholder ={Strings.ExerciseShortDescriptionHint} />
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.DescriptionText}</h3>
                        <Input onChange = {handleChange} type="textarea" name="Description" id={ExerciseChangeSwitchStrings.Description} placeholder ={Strings.ExerciseDescriptionHint}/>
                    </FormGroup>
                    <Col>
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
                </Form>
            </div>
        </div>
    )
}

export default NewExercise