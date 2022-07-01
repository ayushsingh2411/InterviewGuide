import React, { useState } from 'react';
import './register.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const navigate = useNavigate(); //created an instance

    //state variable user is an object, whose all field values are initialized to an empty string
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({
            ...user,
            [name]: value
        })
    };

    const register = () => {
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && reEnterPassword) {
            if (password === reEnterPassword) {
                //alert("Posted");
                axios.post("http://localhost:9002/register", user)
                    .then(res => {
                        alert(res.data.message)
                        navigate("/login");
                    });
            }
            else {
                alert("Password and ReEnterPassword are not same");
            }
        }
        else {
            alert("Please Enter all the Fields")
        }

    };

    return (
        <div className='background'>
            <div className='register'>
                {/* {console.log("User ",user)} */}
                <h1 style={{ color: '#268daa' }}>InterviewGuide</h1>
                <br></br>
                <h1>Register</h1>
                <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
                <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
                <input type="password" name="password" value={user.password} placeholder='Your Password' onChange={handleChange}></input>
                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder='Re-enter Password' onChange={handleChange}></input>
                <div className='button' onClick={register}>Register</div>
                <div>or</div>
                <div className='button' onClick={() => navigate("/login")}>Login</div>
            </div>
        </div>
    );
}
