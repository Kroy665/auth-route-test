import React from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios'
function Logout({sendLogsToDisplayedSite}) {
    const logoutBtn = async (e) => {
        e.preventDefault();
        try {
            const refToken = localStorage.getItem('kroyRefreshToken');
            // console.log(refToken);
            // const token = {
            //     refreshToken: refToken
            // }

            await axios.delete(`${process.env.REACT_APP_POST_APIS}/logout/${refToken}`)
            .then(() => {
                localStorage.removeItem('kroyAccessToken');
                localStorage.removeItem('kroyRefreshToken');
                const res = {
                    status: '204',
                    log: 'Log out Successfull...'
                }
                // console.log(res);
                sendLogsToDisplayedSite(res)

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
                    Log Out
                </h2>
                <p>After you log out, the AccessToken and refresh token will be deleted from Local Storage and Redis Server...</p>
            </div>
            <Button onClick={logoutBtn}>Log out</Button>
        </div>
    )
}

export default Logout
