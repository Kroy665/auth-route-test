import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
function LogIn({sendLogsToDisplayedSite}) {
    const history = useHistory()
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const emailChange=(e)=>{
        const newData = {...userData };
        newData[e.target.name] = e.target.value;
        setUserData(newData);
    }
    const passwordChange=(e)=>{
        const newData = {...userData };
        newData[e.target.name] = e.target.value;
        setUserData(newData);
    }
    const onFormSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_POST_APIS}/login`,userData)
            .then((res)=>{
                const token = res.data;
                    // console.log('token:',token.accessToken);
                    localStorage.setItem('kroyAccessToken', token.accessToken);
                    localStorage.setItem('kroyRefreshToken', token.refreshToken);
                    var logData ={
                        'log1': 'Creating new Access Token and Refresh Token for login...',
                        'log2': 'Saving Access Token in Redis Server...',
                        token: res.data,
                        'log3': 'Saving Access Token and Refresh Token in Local  Storage...'
                    }
                    // console.log(logData);
                    sendLogsToDisplayedSite(logData)
                    history.push('/')
            })
            .catch((err)=>{
                // console.log(err.response.data.error)
                sendLogsToDisplayedSite(err.response.data.error)
            })
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Form onSubmit={onFormSubmit}>
            <div>
                <h2 style={{display: 'flex',  justifyContent: 'center'}}>
                    Log In
                </h2>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' onChange={emailChange}  />
                <Form.Text className="text-muted">
                Enter Registered Email Address
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={passwordChange} autoComplete="current-password"/>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LogIn

