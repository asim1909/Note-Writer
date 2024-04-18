import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter a password");
            return;
        }
        
        setError("");

        // Login Api call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });
            // Handle login success
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            // Handle login error
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

  return (
  <>
    <Navbar />
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-blue-500'>
    <div className='w-96 border rounded-lg bg-white shadow-xl px-8 py-10'>
        <form onSubmit={handleLogin} className="space-y-4">
            <h4 className='text-2xl mb-4 font-semibold text-center text-gray-800'>Login</h4>

            <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute left-3 top-2 text-gray-400">
                    <i className="fas fa-envelope"></i>
                </span>
            </div>
            
            <PasswordInput 
                    value={password} onchange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button 
                type="submit" 
                className="btn-primary w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Login
            </button>

            <p className="text-sm text-center mt-3 text-gray-600">
                Not registered?{" "}
                <Link to="/signUp" className="font-medium text-blue-500 hover:text-blue-600 underline">
                    Create an Account
                </Link>
            </p>
        </form>
    </div>
</div>

   </>
  )
};

export default Login;