import React from 'react'

// import dependencies
import {AuthHeader} from 'authorization/AuthHeader'
import {WebApiRequests} from 'authorization/Contracts'
import ActionHeader from 'components/ActionHeader'

// import resources
import {Strings, ExerciseChangeSwitchStrings} from 'res/Strings'

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

import Switch from "react-bootstrap-switch";

const ExerciseEdit = ({sendClose, editExercise, instructionVideoLink}) => {
    const [exerciseName, SetExerciseName] = React.useState(editExercise.exerciseName)
    const [exerciseShortDescription, SetExerciseShortDescription] = React.useState(editExercise.shortDescription)
    const [exerciseDescription, SetExerciseDescription] = React.useState(editExercise.description)
    const [hasVideo, setHasVideo] = React.useState(editExercise.hasVideo)
    const [InstructionVideo, setInstructionVideo] = React.useState(instructionVideoLink)

    const handleChange = (e) => {
        switch(e.target.id){
            case ExerciseChangeSwitchStrings.ExerciseName:
                SetExerciseName(e.target.value)
                break;

            case ExerciseChangeSwitchStrings.ShortDescription:
                SetExerciseShortDescription(e.target.value)
                break;

            case ExerciseChangeSwitchStrings.Description:
                SetExerciseDescription(e.target.value)
                break;

            case ExerciseChangeSwitchStrings.InstructionVideo:
                setInstructionVideo(e.target.value)
                break;
            
            default:
                break;
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        let updateInstructionVideo = (hasVideo ? InstructionVideo : null)

        let updateData = {
                'Id' : editExercise.id,
                'ExerciseName' : exerciseName,
                'ShortDescription' : exerciseShortDescription,
                'Description' : exerciseDescription,
                'HasVideo' : hasVideo,
                'InstructionVideo' : updateInstructionVideo
        }

        const requestOptions = {
            method: 'PUT',
            headers: ({
                'Authorization' : AuthHeader.authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(updateData)
        }

        await fetch(
            WebApiRequests.EDzControlExercises + '/' + editExercise.id,
            requestOptions)
            .then(response => {
                console.log(response)
            })
        sendClose()
    }

    return (
        <div>
            <ActionHeader
                action = {Strings.EditTextWithSpaceForIcon}
                title = {Strings.ExerciseText}
                sendClose = {sendClose}
            />
            <Container>
                <Form onSubmit = {handleSave}>

                    <FormGroup>
                        <h3>{Strings.ExerciseText}</h3>
                        <Input onChange = {handleChange}
                        type="text"
                        defaultValue={exerciseName}
                        name={ExerciseChangeSwitchStrings.exerciseName} 
                        id={ExerciseChangeSwitchStrings.ExerciseName} 
                        placeholder={Strings.ExerciseTextHint}/>
                    </FormGroup>

                    <FormGroup>
                        <h3>{Strings.ShortDescriptionText}</h3>
                        <Input onChange = {handleChange} 
                        type="text" 
                        name={ExerciseChangeSwitchStrings.ShortDescription} 
                        defaultValue={exerciseShortDescription}
                        id={ExerciseChangeSwitchStrings.ShortDescription} 
                        placeholder={Strings.ExerciseShortDescriptionHint} />
                    </FormGroup>

                    <FormGroup>
                        <h3>{Strings.DescriptionText}</h3>
                        <Input onChange = {handleChange} 
                        type="textarea" 
                        name={ExerciseChangeSwitchStrings.Description}
                        defaultValue={exerciseDescription}
                        id={ExerciseChangeSwitchStrings.Description} 
                        placeholder ={Strings.ExerciseDescriptionHint}/>
                    </FormGroup>

                    <Row>
                        <Col>
                            <FormGroup>
                            <h3>{Strings.InstructionVideoText}</h3>
                                <Input 
                                disabled = {!hasVideo}
                                defaultValue={InstructionVideo}
                                onChange = {handleChange} 
                                type="url" name={ExerciseChangeSwitchStrings.InstructionVideo} 
                                id={ExerciseChangeSwitchStrings.InstructionVideo} 
                                placeholder={Strings.ExerciseInstructionVideoHint}/>
                            </FormGroup>
                        </Col>

                        <Col>
                            <div id="switches">
                                <h4>{Strings.InstructionVideoSwitchText}</h4>
                                <Switch
                                defaultValue={hasVideo}
                                onChange = {()=> setHasVideo(!hasVideo)}
                                onColor="primary" offColor="primary"
                                />
                            </div>
                        </Col>
                    </Row>

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

export default ExerciseEdit