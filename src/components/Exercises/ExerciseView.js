import React from 'react'

// import dependencies
import YouTube from 'react-youtube';
import { GetId } from 'services/YoutubeUrlExtractorService';

// reactstrap components
import {
    Container,
    ListGroup,
    ListGroupItem,
  } from "reactstrap";

// import resources
import {Strings} from '../../res/Strings'

// User's view on exercise
// TODO create input layout from table on backend. new branch for this.
const ExerciseView = ({exercise, sendClose}) => {

    function renderVideo(){
        if (exercise.hasVideo){
            return <YouTube
            videoId={GetId(exercise.instructionVideo)}
            />
        }
    }

    return (
        <div>
            <Container>
                <h1>{exercise.exerciseName}</h1>
                <h2>{exercise.shortDescription}</h2>
                <h3>{exercise.description}</h3>
            </Container>
            <Container>
                {renderVideo()}
            </Container>
            <Container>
                <ListGroup>
                <ListGroupItem
                    onClick={() => sendClose()}
                    tag="button" action>
                        <h2>{Strings.BackText}</h2>
                    </ListGroupItem>
                </ListGroup>
            </Container>
        </div>
    )
}

export default ExerciseView
