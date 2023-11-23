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
    if (!token) {
      navigate('/signIn');
      return;
    }

    if (!user && token) {
      dispatch(fetchUserProfile(token));
    }
  }, [user, token, dispatch, navigate]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const { firstName, lastName } = user;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
  };

  const handleSaveClick = () => {
    const updatedInfo = {
      firstName: editedFirstName,
      lastName: editedLastName,
    };
  
    dispatch(updateUserProfile(token, updatedInfo))
      .then(() => {
        setIsEditing(false); // Close edit mode on successful update
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Optionally, handle error in UI
      });
  };

  const handleCancelClick = () => {
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
