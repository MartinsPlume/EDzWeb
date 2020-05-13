import React from 'react'

// reactstrap components
import {
    Container,
    ListGroup,
    ListGroupItem,
  } from "reactstrap";

import {Strings} from '../../res/Strings'

const AssignmentExercise = ({exercise, sendClose}) => {

    return (
        <div>
            <Container>
                <h1>{exercise.exerciseName}</h1>
                <h2>{exercise.shortDescription}</h2>
                <h3>{exercise.description}</h3>
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

export default AssignmentExercise
