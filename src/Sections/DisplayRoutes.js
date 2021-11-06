import React from 'react'
import {
    Link
  } from "react-router-dom";
function DisplayRoutes() {
    return (
        <div style={{
            backgroundColor: '#e9edf6',
            width: '33%',
            border: '5px solid gray',
            padding: '2%',
            margin: '1%',
            height: '600px',

          }}>
            <ul>
                <li>
                    <Link to='/home'> Home</Link>
                </li>
                <li>
                    <Link to='/register'> Register</Link>
                </li>
                <li>
                    <Link to='/login'> Log In</Link>
                </li>
                <li>
                    <Link to='/refresh-token'> Refresh token</Link>
                </li>
                <li>
                    <Link to='/logout'> Log Out</Link>
                </li>
                
            </ul>
        </div>
    )
}

export default DisplayRoutes
