import React from 'react'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

// reactstrap components
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
  } from "reactstrap";

  // display exercises list for users
const ExercisesList = ({exercises, handleChoice}) => {

    function renderListGroupItems() {
        return exercises.map(exercise => {
            return <ListGroupItem
            onClick={() => handleChoice(
                ActionSwitchStrings.ActionSwitchView,
                exercise.id)} 
                tag="button" action>
                    <ListGroupItemHeading>{exercise.exerciseName}</ListGroupItemHeading>
                    <ListGroupItemText>{exercise.shortDescription}</ListGroupItemText>
            </ListGroupItem>
        });
    }

    return (
        <div>
            <ListGroup>
                {renderListGroupItems()}
            </ListGroup>
        </div>
    )
}

export default ExercisesList