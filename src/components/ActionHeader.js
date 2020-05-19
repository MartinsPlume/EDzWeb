import React from 'react'

// reactstrap components
import {
    Button,
    Row,
    Col,
  } from "reactstrap";

// resources
import {Strings} from 'res/Strings'

// Edit form header used by assignments and exercises
const ActioneHeader = ({action, title, sendClose}) => {
    return (
            <Row>
                <Col sm={{ size: 3, order: 1, offset: 1 }}>
                    <h1>
                    <i
                        aria-hidden={false}
                        className='nc-icon nc-paper'
                        />
                        {action}
                    </h1>
                </Col>                    
                <Col sm={{ size: 3, order: 2, offset: 1 }}>
                    <h2>{title}</h2>
                </Col>
                <Col sm={{ size: 3, order: 3, offset: 1 }}>
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
    )
}

export default ActioneHeader