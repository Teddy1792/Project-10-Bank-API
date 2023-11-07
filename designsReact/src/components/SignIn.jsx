import '../styles/SignIn.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export function SignIn() {
  return (
    <main className="bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon className='iconUser' icon={faUserCircle} />
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <NavLink to="/Account" className="sign-in-button">Sign In</NavLink>
          {/* Uncomment below line to use the button instead */}
          {/* <button className="sign-in-button">Sign In</button> */}
        </form>
      </section>
    </main>
  );
}
