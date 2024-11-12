import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Forgetpassword() {
    const [email, setEmail] = useState({
        email: ""
    });

    const handleSignUpDataChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    };

    const handleSignUpDataSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://law-api.tecosys.ai/api/forgot-password/", { email: email.email });
            toast.success("Password reset email sent!");
        } catch (error) {
            console.error("Error:", error.response || error.message);
            toast.error("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className=' h-screen justify-center items-center flex'>
            <div className='h-[400px] bg-indigo-600 w-[400px] rounded-xl shadow-lg'>
                <form onSubmit={handleSignUpDataSubmit} className='flex flex-col'>
                    <p className='text-white font-medium text-xl  flex justify-center items-center mt-[60px]'>Forget Password</p>
                    <p className='text-white font-medium mt-[20px] mb-[10px] ml-[10px]'>Email address</p>
                    <input 
                        name="email" // Corrected from "username" to "email"
                        value={email.email} 
                        className='text-black outline-none w-[380px] ml-[10px] pl-2 pr-2 pt-2 pb-2 rounded font-medium'
                        type="text" 
                        placeholder="Enter your email" // Updated placeholder to be more descriptive
                        onChange={handleSignUpDataChange} 
                        required 
                    />
                    <button className='font-medium text-indigo-600 bg-white w-[380px] border-[1px] border-white ml-[10px] mt-[20px] pt-2 pb-2 rounded hover:text-white hover:border-[1px] hover:border-white hover:bg-indigo-600' type='submit'>Forget</button>
                </form>
                <div className='mt-[20px] flex justify-center items-center gap-2'>
                    <div className='h-[1px] w-[150px] bg-white'></div>
                    <div>
                    <p className='text-white font-medium flex justify-center items-center'>Or</p>
                    </div>
                    <div className='h-[1px] w-[150px] bg-white'></div>
                </div>
                
                <p className='text-white font-medium flex justify-center items-center mt-[20px] gap-1'>Back to  <a href='/auth-user' className='hover:cursor-pointer underline'> Login</a></p>
            </div>
        </div>
    );
}

export default Forgetpassword;
