import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Logo from '../assest/logo.png';
import { types } from '../../types/types';

export const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        const action = {
            type: types.logout,
        }
        dispatch(action);
        navigate('/login', {
            replace: true
        });
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link
                className="navbar-brand"
                to="/"
            >
                < img src={Logo} alt='logo' />
            </Link>
            <div className="navbar-collapse">
                <div className="navbar-nav">
               
                    <NavLink
                        className={({ isActive }) => "nav-item nav-link " + (isActive ? 'active' : '')}
                        to="/chef"
                    >
                        Chef
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => "nav-item nav-link " + (isActive ? 'active' : '')}
                        to="/waiter"
                    >
                        Waiter
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => "nav-item nav-link " + (isActive ? 'active' : '')}
                        to="/admin"
                    >
                        Admin
                    </NavLink>
                    <div className='navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end'>
                        <ul className='navbar-nav ml-auto'>
                            <spa className='nav-item nav-link text-info'>
                                {user.email}
                            </spa>
                            <button
                                className="nav-item nav-link btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}