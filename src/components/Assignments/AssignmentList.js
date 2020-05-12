import React from 'react'

// import resources
import {ActionSwitchStrings} from '../../res/Strings'

// reactstrap components
import {
    ListGroup,
    ListGroupItem,
  } from "reactstrap";

const AssignmentList = ({assignments, handleChoice}) => {

    function renderListGroupItems() {
        return assignments.map(assignment => {
            return <ListGroupItem
            onClick={() => handleChoice(
                ActionSwitchStrings.ActionSwitchView,
                assignment.exerciseId)} 
                tag="button" action>
                    <h3>{assignment.shortInstruction}</h3>
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

export default AssignmentList