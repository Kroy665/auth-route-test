import React,{useState} from 'react'
import {
    Switch,Route
  } from "react-router-dom";
  import Register from '../Components/Register'
  import LogIn from '../Components/LogIn'
  import Home from '../Components/Home'
  import RefreshToken from '../Components/RefreshToken'
  import Logout from '../Components/Logout'
function DisplaySite({sendLogsToApp}) {
    const [logs, setLogs] = useState()
    
    const sendLogsToDisplayedSite =(index)=>{
        // console.log("Send: ",index)
        setLogs(index)
    }
    sendLogsToApp(logs)
    return (
        <div style={{
            backgroundColor: '#e9edf6',
            width: '33%',
            border: '5px solid gray',
            padding: '2%',
            margin: '1%',
            height: '600px',
        }}>
            {/* <h1>This is a test project for Authorization test</h1> */}
            <Switch>
                
                
                <Route path='/register'>
                    <Register sendLogsToDisplayedSite={sendLogsToDisplayedSite}/>
                </Route>
                <Route path='/login'>
                    <LogIn sendLogsToDisplayedSite={sendLogsToDisplayedSite}/>
                </Route>
                <Route path='/refresh-token'>
                    <RefreshToken sendLogsToDisplayedSite={sendLogsToDisplayedSite}/>
                    </Route>
                <Route path='/logout'>
                    <Logout sendLogsToDisplayedSite={sendLogsToDisplayedSite}/>
                </Route>
                <Route path='/'>
                    <Home sendLogsToDisplayedSite={sendLogsToDisplayedSite}/>
                </Route>
            </Switch>
            
        </div>
    )
}

export default DisplaySite
