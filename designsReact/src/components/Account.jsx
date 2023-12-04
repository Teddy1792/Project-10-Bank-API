import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Transaction from './Transaction';
import { fetchUserProfile } from '../serviceLayer/authService';
import { updateUserProfile } from '../serviceLayer/authService';
import '../styles/Account.scss';

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.authToken); // Retrieve the token from Redux state

  // State for managing edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');

  useEffect(() => {
    // Check if a token exists; if not, redirect to sign-in page
    if (!token) {
      navigate('/signIn');
      return;
    }

    // Fetch user profile data if the user is not already loaded and a token exists
    if (!user && token) {
      dispatch(fetchUserProfile(token));
    }
  }, [user, token, dispatch, navigate]);

  if (!user) {
    // If user data is not yet available, display a loading message
    return <div>Loading user data...</div>;
  }

  const { firstName, lastName } = user;

  const handleEditClick = () => {
    // Enable edit mode and populate the edited fields with user's current data
    setIsEditing(true);
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
  };

  const handleSaveClick = () => {
    // Prepare updated user profile information
    const updatedInfo = {
      firstName: editedFirstName,
      lastName: editedLastName,
    };
  
    // Dispatch an action to update the user's profile
    dispatch(updateUserProfile(token, updatedInfo))
      .then(() => {
        // Close edit mode on successful update
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Optionally, handle error in the UI or display a user-friendly error message
      });
  };

  const handleCancelClick = () => {
    // Cancel edit mode
    setIsEditing(false);
  };

  return (
    <section className='account'>
        <div className='userName'>
        <h1>Welcome back<br/>{`${firstName} ${lastName}`}!</h1>
            {isEditing ? (
              <div className='buttonsEdit'>
                <div className='inputRow'>
                  <input 
                    className='firstName'
                    type="text" 
                    value={editedFirstName} 
                    onChange={(e) => setEditedFirstName(e.target.value)} 
                    placeholder={firstName}
                  />
                  <input 
                    className='lastName'
                    type="text" 
                    value={editedLastName} 
                    onChange={(e) => setEditedLastName(e.target.value)} 
                    placeholder={lastName}
                  />
                </div>
                <div className='buttonRow'>
                  <button className='saveBtn' onClick={handleSaveClick}>Save</button>
                  <button className='cancelBtn' onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className='edit-button' onClick={handleEditClick}>Edit Name</button>
            )}
        </div>
      <Transaction accountTitle="Argent Bank Checking" accountNumber="x8349" availableBalance="2,082.79" />
      <Transaction accountTitle="Argent Bank Savings" accountNumber="x6712" availableBalance="10,928.42" />
      <Transaction accountTitle="Argent Bank Credit Card" accountNumber="x8349" availableBalance="184.30" />
    </section>
  );
}

export default Account;
