import React from 'react'
import {useState} from 'react'
import TextInput from '../components/shared/TextInput'
import PasswordInput from '../components/shared/PasswordInput'
import {Link} from "react-router-dom";
import makeUnauthenticatedPOSTRequests from '../utils/serverHelpers'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [cookie, setCookie] = useCookies(['token']);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = async () => {
        const data = {
            email,
            password    
        };

        try {
            const response = await makeUnauthenticatedPOSTRequests("https://musically-backend.onrender.com/auth/login", data);

            console.log(response);
            const token = response.token;

            

            const date = new Date();
            date.setDate(date.getDate() + 30);

            setCookie('token', token, { path: '/', expires: date });
            
            if (response && !response.err) {
                console.log(response);
                alert("Logged In Successfully");
                navigate('/dashboard');
            } else {
                alert(`Login failed: ${response.err}`);
            }
        } catch (error) {
            console.error('SignUp failed:', error);
            alert(`Login failed: ${error.message}`);
        }
    };
    return (
        <div className='w-full h-full flex flex-col items-center font-ubuntu'>
            <div className='logo border-b border-solid-black p-4 w-full flex justify-center'>Logo</div>
            <div className='inputRegion w-1/3 flex items-center justify-center flex-col border-2 p-12 mt-8 rounded-lg'>
            <div className='font-semibold mb-8'>
            To continue, login to Musically
            </div>
            <TextInput 
            label="Email address or username" 
            placeholder="Email address or username" 
            className="my-2"
            value={email}
            setValue={setEmail}
            />
            <PasswordInput 
            label='Password' 
            placeholder='Password' 
            value={password}
            setValue={setPassword}
            />
            <div className='w-full flex flex-col items-end justify-end'>
            <button 
            className='w-1/4 text-black p-2 rounded-full mt-4 flex items-center justify-center border-2'
            onClick={(e) => {
                e.preventDefault();
                login();
            }}
            >LOGIN</button>
            </div>
            <div className='border-2 border-b-neutral-800 w-full my-4'></div>
            <div className='font-bold my-6'>Don't have an account? </div>
            <button className='w-full text-black p-2 rounded-full border-2'>
            <Link to="/signup">SIGN UP FOR MUSICALLY </Link>
            </button>
            </div>
        </div>
    )
}

export default LoginComponent
