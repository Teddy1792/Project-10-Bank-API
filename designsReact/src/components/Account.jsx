import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Transaction from './Transaction';
import { fetchUserProfile } from '../serviceLayer/authService';
import '../styles/Account.scss';

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate for redirection
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Redirect to home page or login page if no token found
      navigate('/signIn');
      return;
    }

    // Fetch user data if not already in Redux state and token is available
    if (!user && token) {
      dispatch(fetchUserProfile(token));
    }
  }, [user, token, dispatch, navigate]);

  // Handle loading state or no user data
  if (!user) {
    return <div>Loading user data...</div>;
  }

  const { firstName, lastName } = user;

  return (
    <section className='account'>
        <div className='userName'>
            <h1>Welcome back<br/>{`${firstName} ${lastName}`}!</h1>
            <button className='edit-button'>Edit Name</button>
        </div>
      <Transaction accountTitle="Argent Bank Checking" accountNumber="x8349" availableBalance="2,082.79" />
      <Transaction accountTitle="Argent Bank Savings" accountNumber="x6712" availableBalance="10,928.42" />
      <Transaction accountTitle="Argent Bank Credit Card" accountNumber="x8349" availableBalance="184.30" />
    </section>
  );
}

export default Account;
