import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'

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

const EditAssignment = ({editAssignment, students, exercises, sendClose, setTableMessage}) => {
    const [assignment] = React.useState(editAssignment)
    const [userId, setUserId] = React.useState(editAssignment.userId)
    const [userEmail, setUserEmail] = React.useState(editAssignment.userEmail)
    const [shortInstruction, SetShortInstruction] = React.useState(editAssignment.shortInstruction)
    const [exerciseId, setExerciseId] = React.useState(editAssignment.exerciseId)

    const [exerciseNames] = React.useState(exercises.map(exercise => exercise.exerciseName)) 
    const [emails] = React.useState(students.map(student => student.email))
    console.log(assignment)

    
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
            .then(response => setTableMessage(ModalStatusStrings.Deleted)
            )
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
                setExerciseId(exercises.find(exercise => exercise.exerciseName===e.target.value).exerciseId)
                break;
            
            default:
                break;
        }
    }

    const addEdit = async (e) => {
        e.preventDefault()

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
            .then(response => setTableMessage(ModalStatusStrings.ModalAdded));
        
        sendClose()
    }


    return (
        <div>
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
                            <h2>{Strings.AssignmentText}</h2>
                        </Col>
                        <Col className="form-row ">
                            <Button
                                onClick= {(e) => sendClose()}
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
            </div>

            <div>
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
                        defaultValue={exercises.find(exercise => exercise.id===editAssignment.exerciseId).exerciseName}
                        onChange = {handleChange} 
                        type="select" 
                        name="Description" 
                        id={AssignmentChangeSwitchStrings.AssignmentExercise}>
                            {renderExercises()}
                        </Input>
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

export default EditAssignment