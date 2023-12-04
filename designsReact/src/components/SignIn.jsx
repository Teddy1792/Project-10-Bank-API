import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
// Import actions
import { loginUser, fetchUserProfile } from '../serviceLayer/authService';
import '../styles/SignIn.scss';

function SignIn() {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for an error message
  const [error, setError] = useState('');

  // Get navigation function and dispatch from hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the token from Redux state
  const token = useSelector(state => state.auth.authToken);

  useEffect(() => {
    if (token) {
      // Fetch user profile when token exists
      dispatch(fetchUserProfile(token))
        .then(() => {
          navigate('/Account');
        })
        .catch(error => {
          console.error('Error during profile fetch:', error);
        });
    }
  }, [token, dispatch, navigate]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
      setError(''); // Clear the error message if login is successful
    } catch (error) {
      console.error(error.customMessage || 'Login failed');
      setError(error.customMessage || 'Login failed'); // Set the error message
    }
  };

  return (
    <main className="bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon className="iconUser" icon={faUserCircle} />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        <div className='errorMessage'>{error && <div className="error-message">{error}</div>}</div>
      </section>
    </main>
  );
}

export default SignIn;
