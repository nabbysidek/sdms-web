import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                       <Link to='/'/> 
                    </li>
                    <li>
                        <Link to='/signup' />
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout