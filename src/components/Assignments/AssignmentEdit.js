import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'
import ActioneHeader from 'components/ActionHeader';

// import resources
import {Strings, AssignmentChangeSwitchStrings} from '../../res/Strings'

// reactstrap components
import {
    Alert,
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input
  } from "reactstrap";

const AssignmentEdit = ({editAssignment, students, exercises, sendClose, editAssignmentExercise}) => {
    
    // Define main values
    const [assignment] = React.useState(editAssignment)
    const [userId, setUserId] = React.useState(editAssignment.userId)
    const [userEmail, setUserEmail] = React.useState(editAssignment.userEmail)
    const [shortInstruction, SetShortInstruction] = React.useState(editAssignment.shortInstruction)
    const [exerciseId, setExerciseId] = React.useState(editAssignment.exerciseId)

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
                setUserEmail(e.target.value)
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

    // handle updating the values to database by using PUT Web API request with the correct assignment ID
    const addEdit = async (e) => {
        e.preventDefault()
        
        // Created a new object from assignment to get the correct JSON layout
        let updateData = assignment
        updateData.userId=userId
        updateData.shortInstruction=shortInstruction
        updateData.exerciseId=exerciseId

        const requestOptions = {
            method: 'PUT',
            headers: ({
                'Authorization' : AuthHeader.authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(updateData)
        };
        await fetch(
            WebApiRequests.EDzControlTeacherAssignments + '/' + assignment.id,
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
    }

    return (
        //Layout:
        // Render header with title and close button
        // Render failure notificaiton in case of unsuccessful save
        // Render editing form
        // TODO add if filled out handler for each and display on the row with save button? Leaving empty columns for now.
        <div>
             <ActioneHeader
                action = {Strings.EditTextWithSpaceForIcon}
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
                <Form onSubmit = {addEdit}>
                    <FormGroup>
                        <h3>{Strings.UserEmailText}</h3>
                        <Input 
                        defaultValue={userEmail}
                        onChange = {handleChange} 
                        type="select" name="Email" 
                        id={AssignmentChangeSwitchStrings.UserEmail}>
                            {renderEmails()}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.ShortInstructionText}</h3>
                        <Input 
                        defaultValue={shortInstruction}
                        onChange = {handleChange} 
                        type="text" name="ShortInstruction" 
                        id={AssignmentChangeSwitchStrings.ShortInstruction} />
                    </FormGroup>
                    <FormGroup>
                        <h3>{Strings.ExerciseText}</h3>
                        <Input
                        defaultValue={editAssignmentExercise}
                        onChange = {handleChange} 
                        type="select" 
                        name="Description" 
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

export default AssignmentEdit