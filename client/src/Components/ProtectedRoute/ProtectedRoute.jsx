import './ProtectedRoute.css';
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext';

export default function ProtectedRoute(props) {
  
  const { allowedRoles } = props;
  const { isAuthenticated, userData } = useContext(AuthContext);

  const pleaseLogin =
    <React.Fragment>
      <p></p>
    </React.Fragment>

  const notAllowed = 
    <React.Fragment>
      <p></p>
    </React.Fragment>

  const noRolesSet =
    <React.Fragment>
      <p>!! This page can not be accesed by anybody because 'allowed roles' are not set !!</p>
    </React.Fragment>

  const result = () => {
    if (!allowedRoles) {
      return noRolesSet
    }

    if (!isAuthenticated) {
      return pleaseLogin
    }

    if (allowedRoles[0]==='all' || allowedRoles.includes(userData.role)) {
      return (
        <React.Fragment>
          {props.children}
        </React.Fragment>
      )
    } else {
      return notAllowed
    }
  }

  return (
    <React.Fragment>
      { result() }
    </React.Fragment>
  )

}
