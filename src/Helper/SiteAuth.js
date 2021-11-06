// import React from 'React'
import axios from 'axios'
function SiteAuth(token) {

    try {
        // const token = localStorage.getItem('kroyAccessToken')
        const AuthStr = 'Bearer '.concat(token); 
        const data =axios.get('http://localhost:5000', { headers: { Authorization: AuthStr } })
        .then(res=>{
            // console.log("site: ",res)
            return res
        }).catch(err=>{
            throw err
        })
        return data
    } catch (error) {
        throw error
    }

    
}

export default SiteAuth

