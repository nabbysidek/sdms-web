import { Outlet, Link } from 'react-router-dom'

import './Layout.css'

import NavBar from '../navbar/Navbar'
import SideBar from '../sidebar/SideBar'

import { Navbar } from 'react-bootstrap'

function Layout() {
    return(
        <>
            <NavBar />

            <div className="main">
                <SideBar />

                <div className="content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout