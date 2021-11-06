import React,{useState,useEffect} from 'react'

function DisplayConsole(props) {
    //
    const [logs, setLogs] = useState(['loaded']) 

    const mylog = JSON.stringify(props.log);
    // console.log(props.log)
    useEffect(() => {
        setLogs(logs => [...logs, mylog])
    }, [mylog]);
    //

    // const [logs1, setLogs1] = useState(['loaded']) 
    // const logCont = props.log
    // useEffect(() => {
    //     for( var key in logCont.jsonData) {
    //         let data = JSON.stringify(key)
    //         setLogs1(logs => [...logs, data])
    //     }
    // },[logCont])
    // console.log(logs1)


    // const LogContainer =({log})=>{
    //     return (
    //         <p>{log}</p>
    //     )
    // }
    // console.log("logs: ",mylog)
    return (
        <div style={{
            backgroundColor: '#e9edf6',
            width: '33%',
            border: '5px solid gray',
            padding: '2%',
            margin: '1%',
            height: '600px',
            scrollBehavior: 'smooth',
            overflowY: 'scroll',
          }}>
            {logs.map((log,i)=>

                    <div key={i}>{'>> '}
                        {log}
                        {/* <LogContainer log={log}/> */}
                    </div>
                )}
        </div>
    )
}

export default DisplayConsole
