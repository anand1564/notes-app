// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/authContext'; // Import the auth context
import { User } from 'lucide-react';
import { PassThrough } from 'stream';

const AuthForm: React.FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuth(); // Access the global login state
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup form
  const [signupData,setSignupData] = useState({
    username: "",
    email: "",
    password:""
  })
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoggedIn(true); // Set the global state to logged in after successful authentication
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="Enter your username" onChange={(e)=>setSignupData({...signupData,username:e.target.value})} />
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" onChange={(e)=>setSignupData({...signupData,email:e.target.value})}/>
        </div>

        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Enter your password" />
        </div>

        <Button className="w-full mt-4">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <span
          className="text-blue-500 cursor-pointer ml-1"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
