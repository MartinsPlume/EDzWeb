import React from 'react'

// import dependencies
import {AuthHeader} from '../../authorization/AuthHeader'
import {WebApiRequests} from '../../authorization/Contracts'
import ActioneHeader from 'components/ActionHeader';
import { ControlObjUndefined } from 'services/UndefinedService';

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


const AssignmentNew = ({students, exercises, sendClose}) => {

    const [userId, setUserId] = React.useState(()=>(ControlObjUndefined(students)) ? students[0].id : '')
    const [userEmail, setUserEmail] = React.useState()
    const [shortInstruction, SetShortInstruction] = React.useState()
    const [exerciseId, setExerciseId] = React.useState(() => (ControlObjUndefined(exercises)) ? exercises[0].id : '')

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
                console.log(response)
            })
        
        sendClose()
    }


    return (
        <div>

            <ActioneHeader
                action = {Strings.NewTextWithSpaceForIcon}
                title = {Strings.AssignmentText}
                sendClose = {sendClose}
                />

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
            </Container>
        </div>
    )
}

export default AssignmentNew