import { setAuthToken, setUserDetails } from './authActions';

const API_URL = 'http://localhost:3001/api/v1';

// Function for handling API errors
const handleApiError = async (response) => {
  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    error.response = response;
    error.data = await response.text().catch(() => '');
    throw error;
  }
};

// Function for logging in
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const loginResponse = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    await handleApiError(loginResponse);

    const { body: { token } } = await loginResponse.json();

    if (token) {
      dispatch(setAuthToken(token));
    }

    return token;
  } catch (error) {
    console.error('Login failed:', error.message, error.data);
    error.customMessage = 'Invalid email or password. Please try again.';
    throw error;
  }
};

// Function for fetching user profile
export const fetchUserProfile = (token) => async (dispatch) => {
  try {
    const profileResponse = await fetch(`${API_URL}/user/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    await handleApiError(profileResponse);

    const { body } = await profileResponse.json();

    if (body) {
      dispatch(setUserDetails(body));
    }
  } catch (error) {
    console.error('Error fetching user profile:', error.message, error.data);
    error.customMessage = 'An error occurred while trying to fetch user profile.';
    throw error;
  }
};

// Function for updating user profile
export const updateUserProfile = (token, updatedData) => async (dispatch) => {
  try {
    const updateResponse = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    await handleApiError(updateResponse);

    const { body } = await updateResponse.json();

    if (body) {
      dispatch(setUserDetails(body)); // Update user details in Redux store
    }

    return body;
  } catch (error) {
    console.error('Error updating user profile:', error.message, error.data);
    error.customMessage = 'An error occurred while trying to update user profile.';
    throw error;
  }
};
