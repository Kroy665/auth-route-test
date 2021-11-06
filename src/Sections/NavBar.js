import React from 'react'
// import { Nav, Navbar,Container } from 'react-bootstrap';
function NavBar() {
    return (
        <div>
            <nav style={{ background: '#E9EDF6', color: '#000',padding:'1rem'}}>
                <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', listStyleType: "none", margin: '0'}}>
                    <li>
                        Routes
                    </li>
                    <li>
                        Site
                    </li>
                    <li>
                        Console
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
