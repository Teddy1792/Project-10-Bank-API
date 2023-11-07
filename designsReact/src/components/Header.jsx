import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import argentBank from '../assets/argentBankLogo.png';
import '../styles/Header.scss';

export function Header() {
    const location = useLocation();
    const isAccountPage = location.pathname === '/Account';

    return (
        <header>
            <NavLink to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={argentBank}
                    alt="Argent Bank Logo"
                />
            </NavLink>
            <div className='signIn'>
                {isAccountPage ? (
                    <NavLink to="/" className="main-nav-item">
                        <div className='userName'>
                            <FontAwesomeIcon className='iconUser' icon={faUserCircle} />
                            UserName
                        </div>
                        <div className='SignOut'>
                            <FontAwesomeIcon className='iconSignOut' icon={faSignOutAlt} />
                            Sign Out
                        </div>
                    </NavLink>
                ) : (
                    <NavLink to="/signIn" className="main-nav-item">
                        <FontAwesomeIcon className='iconUser' icon={faUserCircle} />
                        Sign In
                    </NavLink>
                )}
            </div>
        </header>
    );
}
