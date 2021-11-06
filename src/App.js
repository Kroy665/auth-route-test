import React,{useState} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  
} from "react-router-dom";

import NavBar from './Sections/NavBar'
import DisplayRoutes from './Sections/DisplayRoutes'
import DisplaySite from './Sections/DisplaySite'
import DisplayConsole from './Sections/DisplayConsole'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {useHistory} from 'react-router-dom'
function App() {
  // const history = useHistory()
  const [logs, setLogs] = useState()
  const sendLogsToApp=(index)=>{
    // console.log("APP: ",index)
    setLogs(index)
  }
  // history.push('/home')
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-around'}}>
          <DisplayRoutes />
          <DisplaySite sendLogsToApp={sendLogsToApp}/>
          <DisplayConsole log={logs}/>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
