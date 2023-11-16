import { setAuthToken, setUserDetails } from './authActions';

const API_URL = 'http://localhost:3001/api/v1';

// Function for logging in
export const loginUser = (credentials, rememberMe) => async (dispatch) => {
  try {
    const loginResponse = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!loginResponse.ok) {
      const error = new Error(`HTTP error! status: ${loginResponse.status}`);
      error.response = loginResponse;
      error.data = await loginResponse.text().catch(() => '');
      throw error;
    }

    const loginData = await loginResponse.json();

    if (loginData && loginData.body && loginData.body.token) {
      if (rememberMe) {
        localStorage.setItem('token', loginData.body.token);
      } else {
        sessionStorage.setItem('token', loginData.body.token);
      }
      dispatch(setAuthToken(loginData.body.token));
    }

    return loginData;
  } catch (error) {
    console.error('Login failed:', error.message, error.data);
    error.customMessage = 'An error occurred while trying to log in.';
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

    if (!profileResponse.ok) {
      const error = new Error(`HTTP error! status: ${profileResponse.status}`);
      error.response = profileResponse;
      error.data = await profileResponse.text().catch(() => '');
      throw error;
    }

    const profileData = await profileResponse.json();

    if (profileData && profileData.body) {
      dispatch(setUserDetails(profileData.body));
    }
  } catch (error) {
    console.error('Error fetching user profile:', error.message, error.data);
    error.customMessage = 'An error occurred while trying to fetch user profile.';
    throw error;
  }
};


