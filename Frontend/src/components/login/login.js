import React, { useState } from 'react';
import './login.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

    const navigate = useNavigate(); //created an instance

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({
            ...user,
            [name]: value
        })
    };

    const login = () => {
        const { email, password } = user;
        if (email && password) {
            //alert("Posted");
            axios.post("http://localhost:9002/login", user)
                .then(res => {
                    alert(res.data.message);
                    props.setLoginUser(res.data.user);

                    //home page pr send kr denge
                    navigate("/"); //when it goes to home page it again checks whether the user exists or not
                });
        }
        else {
            alert("Please Enter all the Fields")
        }
    };

    return (
        <div className='background'>
            <div className='login'>
                {/* {console.log(user)} */}
                <h1 style={{ color: '#268daa' }}>InterviewGuide</h1>
                <br></br>
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} placeholder="Enter Your Email" onChange={handleChange}></input>
                <input type="password" name="password" value={user.password} placeholder='Enter Your Password' onChange={handleChange}></input>
                <div className='button' onClick={login}>Login</div>
                <div>or</div>
                <div className='button' onClick={() => navigate("/register")}>Register</div>
            </div>
        </div>
    );
}
