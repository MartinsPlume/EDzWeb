import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'
import ActioneHeader from 'components/ActionHeader';


// import resources
import {Strings, AssignmentChangeSwitchStrings, ModalStatusStrings} from '../../res/Strings'

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

const AssignmentEdit = ({editAssignment, students, exercises, sendClose, editAssignmentExercise}) => {
    const [assignment] = React.useState(editAssignment)
    const [userId, setUserId] = React.useState(editAssignment.userId)
    const [userEmail, setUserEmail] = React.useState(editAssignment.userEmail)
    const [shortInstruction, SetShortInstruction] = React.useState(editAssignment.shortInstruction)
    const [exerciseId, setExerciseId] = React.useState(editAssignment.exerciseId)

    const [exerciseNames] = React.useState(exercises.map(exercise => exercise.exerciseName)) 
    const [emails] = React.useState(students.map(student => student.email))
    
    function renderEmails(){
        return emails.map(email => {
            return <option key={email}>{email}</option>
        })
    }

    function renderExercises(){
        return exerciseNames.map(exercise => {
            return <option key={exercise}>{exercise}</option>
        })
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const requestOptions = {
            method: 'DELETE',
            headers: ({
                'Authorization' : AuthHeader.authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            })}
        await fetch(
            WebApiRequests.EDzControlTeacherAssignments + '/' + assignment.id,
            requestOptions)
            .then(response => {
                console.log(response)
            })
        sendClose()
    }

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

    const addEdit = async (e) => {
        e.preventDefault()

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
                console.log(response)
            })
        
        sendClose()
    }


    return (
        <div>
             <ActioneHeader
                action = {Strings.EditTextWithSpaceForIcon}
                title = {Strings.AssignmentText}
                sendClose = {sendClose}
            />

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