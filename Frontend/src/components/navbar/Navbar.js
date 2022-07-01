import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../code.png';

export default function Navbar(props) {
    const navigate = useNavigate();

    const logout= ()=>{
        props.setLoginUser({});
        navigate("/");
    };
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                {/* <img src='/docs/5.1/assets/brand/bootstrap-logo.svg' alt="" width="30" height="24" class="d-inline-block align-text-top"/> */}
                <span className="navbar-brand mb-0 h1" style={{ color: '#268daa' }}>InterviewGuide</span>
                    <div className="d-flex">
                        {/* <button className="btn btn-outline-primary mx-2" >View Profile</button> */}
                        <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

