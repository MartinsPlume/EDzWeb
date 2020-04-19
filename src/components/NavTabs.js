import React, { Component } from 'react'

// import dependencies

// import components


// import pages


// import reactstrap components
import {

  Nav,
} from "reactstrap";

export class NavTabs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             links: props.links,
             activeTab : 1
        }
    }

    render() {
        return (
            <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                    <Nav id="tabs" variant="tabs" role="tablist" tabs>
                        <div>
                            {this.state.links}
                        </div>
                    </Nav>
                </div>
            </div>
        )
    }
}

export default NavTabs
