import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import argentBank from '../assets/argentBankLogo.png';
import { clearAuthToken } from '../serviceLayer/authActions';
import '../styles/Header.scss';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isAccountPage = location.pathname === '/Account';

    // Retrieve the user's first name from the Redux store
    const firstName = useSelector((state) => state.auth.user?.firstName);

    const handleLogout = () => {
        // Clear the token from both localStorage and sessionStorage
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        // Update the global state using Redux
        dispatch(clearAuthToken());

        // Redirect to the home page
        navigate('/');
    };

    return (
        <header>
            <NavLink to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={argentBank}
                    alt="Argent Bank Logo"
                />
            </NavLink>
            <div className='mainRight'>
                {isAccountPage ? (
                    <div className="account-section">
                        <div className='userName'>
                            <FontAwesomeIcon className='iconUser' icon={faUserCircle} />
                            {firstName ? firstName : "UserName"} {/* Display firstName if available */}
                        </div>
                        <div className='signOut' onClick={handleLogout}>
                            <FontAwesomeIcon className='iconSignOut' icon={faSignOutAlt} />
                            Sign Out
                        </div>
                    </div>
                ) : (
                    <NavLink to="/signIn" className="main-nav-item signIn">
                        <FontAwesomeIcon className='iconUser' icon={faUserCircle} />
                        Sign In
                    </NavLink>
                )}
            </div>
        </header>
    );
}

export default Header;
