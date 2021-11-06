import React,{useState,useEffect} from 'react'
// import SiteAuth from '../Helper/SiteAuth'
import axios from 'axios'
import {useHistory} from 'react-router-dom'



function Home({sendLogsToDisplayedSite}) {
    const history = useHistory()
    const [auth, setAuth] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    useEffect(() => {
        const AccessToken = localStorage.getItem('kroyAccessToken')
        const RefreshToken = localStorage.getItem('kroyRefreshToken')
        // console.log(AccessToken)
        if(AccessToken===null){
            sendLogsToDisplayedSite('There is no token... ')
        }else{
            async function SiteAuth(token) {
                try {
                    const AuthStr = 'Bearer '.concat(token.AccessToken);
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': AuthStr
                    }
                    const tokenData ={
                        "refreshToken": RefreshToken
                    }
                    const data = await axios.post('http://localhost:5000/auth/user-data', tokenData, {
                        headers: headers
                    })
                    .then(res=>{
                        // console.log("site: ",res)
                        return res.data
                    }).catch(err=>{
                        throw err
                    })
                    // console.log("site data: ",data)
                    // return data
                    if(data.Authorization){
                        setAuth(true)
                        setUserData({
                            name: data.name,
                            email: data.email,
                            password: data.password
                        })
                        sendLogsToDisplayedSite({
                            name: data.name,
                            email: data.email,
                            password: data.password
                        })
                    }else{
                        sendLogsToDisplayedSite('UnAuthorized')
                    }
                } catch (error) {
                    throw error
                }    
            }
            SiteAuth({AccessToken,RefreshToken})
        }
        
        
    })
    
// console.log("Site Auth:", auth)
 
    function HomePage(){
        if(auth){
            return (
                <div>
                    <h1 style={{
                            color: 'red', 
                            fontStyle: 'italic', 
                            fontSize: 'revert'
                        }}
                    >
                        Welcome To Home Page
                    </h1>
                    <h3>Mr/Ms. {userData.name}</h3>
                    <h4>Email: {userData.email}</h4>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 style={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'red', 
                            fontStyle: 'italic', 
                            fontSize: 'revert'
                        }}
                    >
                        UnAuthorized
                    </h1>
                    <h4 style={{
                        display: 'flex', 
                        justifyContent: 'center',
                        color: 'blue'
                    }}>Go to</h4>
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center'
                    }}>
                        <button 
                            onClick={()=>{history.push('/login')}}
                            style={{
                                padding: '5px 20px',
                                borderRadius: '5px',
                                backgroundColor: '#fafad2',
                                margin: '5px'
                            }}
                        >
                            Log In
                        </button> 
                            or
                        <button
                            style={{
                                padding: '5px 20px',
                                borderRadius: '5px',
                                backgroundColor: '#fafad2',
                                margin: '5px'
                            }} 
                            onClick={()=>{history.push('/register')}}
                        >
                            Register
                        </button>
                    </div>
                    
                </div>
            )
        }

    }          

    return(
        <div>
            <h1 style={{
                display: 'flex', 
                justifyContent: 'center',
                color: 'green'
            }}>
                Home
            </h1>
            <HomePage/>
        </div>
    )

  
    
}

export default Home
