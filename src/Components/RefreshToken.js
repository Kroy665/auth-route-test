import React from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios'

function RefreshToken({sendLogsToDisplayedSite}) {
    const refButtonClick=async(e)=>{
        e.preventDefault();
        try {
            const refToken = localStorage.getItem('kroyRefreshToken');
            // console.log(refToken);
            const token = {
                "refreshToken": refToken
            }

            await axios.post(`${process.env.REACT_APP_POST_APIS}/refresh-token`,token)
            .then((res)=>{
                const token = res.data;
                // console.log('token:',token.accessToken);
                localStorage.setItem('kroyAccessToken', token.accessToken);
                localStorage.setItem('kroyRefreshToken', token.refreshToken);
                var logData ={
                    'log1': 'Creating new Access Token and Refresh Token for Refresh...',
                    'log2': 'Updating Access Token in Redis Server...',
                    token: res.data,
                    'log3': 'Updateing Access Token and Refresh Token in Local  Storage...'
                }
                // console.log(logData);
                sendLogsToDisplayedSite(logData)
            })
            .catch((err)=>{
                sendLogsToDisplayedSite(err.response.data.error)
            })
        } catch (error) {
            
        }
    }
    return (
        <div>
            <div>
                <h2 style={{display: 'flex',  justifyContent: 'center'}}>
                    Refresh Token
                </h2>
                <p>Access token will expire after 2 hours. For New AccessToken Refresh the token...</p>
            </div>
            <Button onClick={refButtonClick}>Refresh Token</Button>
        </div>
    )
}

export default RefreshToken
