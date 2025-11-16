// authService.js
import jwtDecode from "jwt-decode";

// Function to store the token in localStorage or cookies
export const storeToken = (token) => {
  // console.log(`Token : ${JSON.stringify(token)}`);
  localStorage.setItem("token", token);
};

// Function to retrieve the token
export const getToken = () => {
  const token = localStorage.getItem("token");
  // console.log(`Token : ${JSON.stringify(token)}`);
  return token;
};

// Function to retrieve the userId from the token
export const getUserIdFromToken = () => {
  const token = getToken();

  if (token) {
    try {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);
      // console.log(`decodedToken : ${JSON.stringify(decodedToken)}`);

      // Extract the userId from the decoded token
      const userId = decodedToken.userId;
      localStorage.setItem("userId", userId);

      return userId;
    } catch (error) {
      // Handle any errors that may occur during token decoding
      console.error("Error decoding JWT token:", error);
      return null;
    }
  }

  return null; // Return null if there's no token or if decoding fails
};

export const getUserNameFromToken = () => {
  const token = getToken();

  if (token) {
    try {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);
      // console.log(`decodedToken : ${JSON.stringify(decodedToken)}`);

      // Extract the userId from the decoded token
      const userName = decodedToken.userName;
      localStorage.setItem("userName", userName);

      return userName;
    } catch (error) {
      // Handle any errors that may occur during token decoding
      console.error("Error decoding JWT token:", error);
      return null;
    }
  }

  return null; // Return null if there's no token or if decoding fails
};

// Function to check if the user is authenticated
// export const isAuthenticated = () => {
//   const token = getToken();
//   return !!token; // Convert the token to a boolean
// };

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();

  if (token) {
    try {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);

      // Check if the token has expired
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token has expired
        return false;
      }

      return true; // Token is valid
    } catch (error) {
      // Handle any errors that may occur during token decoding
      console.error("Error decoding JWT token:", error);
      return false; // Return false if decoding fails
    }
  }

  return false; // Return false if there's no token
};

// Function to clear the token
export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

// Function to log out the user
export const logout = () => {
  clearToken();
  // You can also perform other logout-related actions here
};
