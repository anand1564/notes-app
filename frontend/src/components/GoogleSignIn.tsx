import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn: React.FC = () => {
  const navigate = useNavigate();
  const responseGoogle = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.error("Google login failed: No credential received");
      return;
    }

    console.log('Google response:', response);

    try {
      const backendResponse = await fetch("http://localhost:3000/auth/google/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: response.credential })
      });

      const data = await backendResponse.json();
      console.log(data);

      if (backendResponse.ok) {
        console.log("User authenticated:", data);
        localStorage.setItem("token", data.token);
        navigate(`${data.userId}/create/group`);
      } else {
        console.error("Authentication failed:", data.error);
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  const errorGoogle = (error: void) => {
    console.error('Google login error:', error);
  };

  return (
    <GoogleOAuthProvider clientId="">
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={errorGoogle}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
