import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
function Register({sendLogsToDisplayedSite}) {
    const history = useHistory()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const nameChange=(e)=>{
        const newData = {...userData };
        newData[e.target.name] = e.target.value;
        setUserData(newData);
    }
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
    const password2Change=(e)=>{
        const newData = {...userData };
        newData[e.target.name] = e.target.value;
        setUserData(newData);
    }
    const [correctPass, setCorrectPass] = useState(true)
    const onFormSubmit=async(e)=>{
        e.preventDefault();
        if(userData.password===userData.password2){
            // console.log(userData)
            setCorrectPass(true)
            try {
                await axios.post(`${process.env.REACT_APP_POST_APIS}/register`,
                {
                    "userName": userData.name,
                    "email": userData.email,
                    "password": userData.password,
                })
                .then((res)=>{
                    // console.log("Axios: ",res.data.AccessToken);
                    const token = res.data;
                    // console.log('token:',token.accessToken);
                    localStorage.setItem('kroyAccessToken', token.accessToken);
                    localStorage.setItem('kroyRefreshToken', token.refreshToken);
                    var logData ={
                        'log1': 'Creating Access Token and Refresh Token for Registration...',
                        'log2': 'Saving Access Token in Redis Server...',
                        token: res.data,
                        'log3': 'Saving Access Token and Refresh Token in Local Storage...'
                    }
                    
                    sendLogsToDisplayedSite(logData)
                    // console.log(logData);
                    history.push('/')
                })
                .catch( err =>{
                    // console.log("Axios: ",e)
                    sendLogsToDisplayedSite(err.response.data.error)
                })
            } catch (error) {
                // console.log("Catch err: ",error)
            }
        }else{
            setCorrectPass(false)
        }
        
    }
    const EnterCorrectPass=()=>{
        if(correctPass){
            return(
                <p></p>
            )
        }else{
            return(
                <p style={{color: 'red'}}>Enter Correct Password</p>
            )
        }
        
    }
    return (
        
        <Form onSubmit={onFormSubmit}>
            <div>
                <h2 style={{display: 'flex',  justifyContent: 'center'}}>
                    Registration
                </h2>
            </div>
            
            <Form.Group className="mb-3" >
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" name='name' onChange={nameChange}  autoComplete="username" />
                <Form.Text className="text-muted">
                    Please Enter Your Full Name
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' onChange={emailChange}  />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={passwordChange} autoComplete="current-password"/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name='password2' onChange={password2Change} />
            </Form.Group>
            <EnterCorrectPass/>
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
       
    )
}

export default Register
