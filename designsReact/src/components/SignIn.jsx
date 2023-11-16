import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { loginUser, fetchUserProfile } from '../serviceLayer/authService';
import '../styles/SignIn.scss';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token') || '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token))
        .then(() => {
          navigate('/Account');
        })
        .catch(error => {
          console.error('Error during profile fetch:', error);
        });
    }
  }, [token, dispatch, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(loginUser({ email, password }, rememberMe));
      if (response && response.status === 200 && response.body && response.body.token) {
        setToken(response.body.token);  // Update the token state to trigger the useEffect
      } else {
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error(error.customMessage || 'Login failed');
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
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;
