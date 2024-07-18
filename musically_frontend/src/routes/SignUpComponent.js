import React from 'react'
import {useState} from 'react'
import TextInput from '../components/shared/TextInput'
import PasswordInput from '../components/shared/PasswordInput'
import { Link} from "react-router-dom"
import makeUnauthenticatedPOSTRequests from '../utils/serverHelpers'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const SignUpComponent = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");

    const [cookies, setCookie] = useCookies(['token']);

    const signUp = async () => {
        
        const data = {
            firstName,
            lastName,
            email,
            confirmEmail,
            password,
            // confirmPassword,
            username
        };

        if (email !== confirmEmail) {
            alert("Email & confirm email do not match");
            return;
        }

        try {
            const response = await makeUnauthenticatedPOSTRequests("https://musically-backend.onrender.com/auth/register", data);

            console.log(response)
            const token = response.token;
            console.log(token)
            const date = new Date();
            date.setDate(date.getDate() + 30);

            setCookie('token', token, { path: '/', expires: date });

            if (response && !response.err) {
                console.log(response);
                alert("Sign up successful");
                navigate('/login');
            } else {
                alert(`Sign up failed: ${response.err}`);
            }
        } catch (error) {
            console.error('SignUp failed:', error);
            alert(`Sign up failed: ${error.message}`);
        }
    };
    return (
        <div className='w-full h-full flex flex-col items-center font-ubuntu'>
            <div className='logo border-b border-solid-black p-4 w-full flex justify-center'>Logo</div>
            <div className='inputRegion w-1/3 flex items-center justify-center flex-col border-2 p-12 mt-8 rounded-lg'>
                <div className='font-semibold mb-8'>
                    Sign up to listen on Musically
                </div>
                <TextInput 
                label="First Name" 
                placeholder="Enter your first name" 
                className="my-2"
                value={firstName}
                setValue={setFirstName}
                />
                <TextInput 
                label="Last Name" 
                placeholder="Enter your last name" 
                className="my-2" 
                value={lastName}
                setValue={setLastName}         
                />
                <TextInput 
                label="Email address" 
                placeholder="Enter your email" 
                className="my-2" 
                value={email}
                setValue={setEmail}
                />
                <TextInput 
                label="Confirm Email address" 
                placeholder="Enter your email again" 
                className="my-2" 
                value={confirmEmail}
                setValue={setConfirmEmail}
                />
                <PasswordInput 
                label='Password' 
                placeholder='Enter strong password' 
                className="my-2" 
                value={password}
                setValue={setPassword}
                />
                { /*<PasswordInput 
                // label='Confirm Password' 
                // placeholder='Enter password again' 
                // className="my-2" 
                // value={confirmPassword}
                // setValue={setConfirmPassword}
                // /> */}
                <TextInput 
                label="What should we call you?" 
                placeholder="Enter profile username" 
                className="my-2" 
                value={username}
                setValue={setUsername}
                />
                <div className='w-full flex flex-col items-end justify-end'>
                    <button 
                    className=' text-black p-2 rounded-full mt-4 border-2'
                    onClick={(e) => {
                        e.preventDefault();
                        signUp();
                    }}
                    >SIGN UP</button>
                </div>
                <div className='border-2 border-b-neutral-800 w-full my-4'></div>
                <div className='font-bold my-6'>Already have an account? </div>
                <button className='w-full text-black p-2 rounded-full border-2'>
                    <Link to="/login">LOGIN TO MUSICALLY INSTEAD</Link>
                </button>
            </div>
        </div>
    )
}

export default SignUpComponent
