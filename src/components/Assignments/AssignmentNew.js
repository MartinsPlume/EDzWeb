import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'
import ActioneHeader from 'components/ActionHeader';
import { ControlObjUndefined } from 'services/UndefinedService';

// import resources
import {Strings, AssignmentChangeSwitchStrings} from '../../res/Strings'

// reactstrap components
import {
    Alert,
    Button,
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Input
  } from "reactstrap";


const AssignmentNew = ({students, exercises, sendClose}) => {

    const [userId, setUserId] = React.useState(()=>(ControlObjUndefined(students)) ? students[0].id : '')
    const [shortInstruction, SetShortInstruction] = React.useState()
    const [exerciseId, setExerciseId] = React.useState(() => (ControlObjUndefined(exercises)) ? exercises[0].id : '')

    // Get the dropdown list items from props
    const [emails] = React.useState(students.map(student => student.email))
    const [exerciseNames] = React.useState(exercises.map(exercise => exercise.exerciseName))

    // Alert handler
    const [alertWarning, setAlertWarning] = React.useState(false);

    // Get dropdown values for users
    function renderEmails(){
        return emails.map(email => {
            return <option key={email}>{email}</option>
        })
    }

    // Get dropdown values for exercises
    function renderExercises(){
        return exerciseNames.map(exercise => {
            return <option key={exercise}>{exercise}</option>
        })
    }

    // On user entry change the values used for the WEB api request
    const handleChange = (e) => {
        switch(e.target.id){
            case AssignmentChangeSwitchStrings.UserEmail:
                setUserId(students.find(student => student.email === e.target.value).id)
                break;

            case AssignmentChangeSwitchStrings.ShortInstruction:
                SetShortInstruction(e.target.value)
                break;

            case AssignmentChangeSwitchStrings.AssignmentExercise:
                setExerciseId(exercises.find(exercise => exercise.exerciseName===e.target.value).id)
                break;
            
            default:
                break;
        }
    }

    // handle updating the values to database by using POST Web API request
    const handleSave = async (e) => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: ({
                'Authorization' : AuthHeader.authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ 
                'userId' : userId,
                'shortInstruction' : shortInstruction,
                'exerciseId' : exerciseId
             })
        };
        await fetch(
            WebApiRequests.EDzControlTeacherAssignments,
            requestOptions)
            .then(response => {
                // If save is not successful display the alert notification
                if (!response.ok) {
                    setAlertWarning(true)
                }
                // On successful save close the editing view
                else{
                    sendClose()
                }
            })
        
        sendClose()
    }


    return (
        //Layout:
        // Render header with title and close button
        // Render failure notificaiton in case of unsuccessful save
        // Render editing form
        <div>

            <ActioneHeader
                action = {Strings.NewTextWithSpaceForIcon}
                title = {Strings.AssignmentText}
                sendClose = {sendClose}
            />

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
                    <span>{Strings.FailedToSaveText}</span>
                </Container>
            </Alert>

            <Container>
                <Form onSubmit = {handleSave}>
                    <FormGroup>
                        <h3>{Strings.UserEmailText}</h3>
                        <Input 
                        onChange = {handleChange} 
                        type="select" 
                        name="Email" 
                        id={AssignmentChangeSwitchStrings.UserEmail}>
                            {renderEmails()}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.ShortInstructionText}</h3>
                        <Input 
                        onChange = {handleChange} 
                        type="text" 
                        name="ShortInstruction"
                        id={AssignmentChangeSwitchStrings.ShortInstruction} />
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.ExerciseText}</h3>
                        <Input 
                        onChange = {handleChange} 
                        type="select" 
                        name="AssignmentExercise" 
                        id={AssignmentChangeSwitchStrings.AssignmentExercise}>
                            {renderExercises()}
                        </Input>
                    </FormGroup>
                    <Container>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <Col sm={{ size: 3, offset: 3}}>
                                <Button
                                    className="btn btn-round mr-1"
                                    color="success"
                                    type="submit"
                                    >
                                    <i
                                    aria-hidden={false}
                                    className='nc-icon nc-check-2'
                                    />
                                    {Strings.SaveTextWithSpaceForIcon}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Container>
        </div>
    )
}

export default AssignmentNew