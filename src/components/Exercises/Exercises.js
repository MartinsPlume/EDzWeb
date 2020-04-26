import React from 'react'
import { authenticationService } from 'authorization/Authentication'

const Exercises = () => {
    return (
        <div>
            {authenticationService.currentUserRoleValue}
        </div>
    )
}

export default Exercises
