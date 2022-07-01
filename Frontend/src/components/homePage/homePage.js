import React from 'react';
import './homePage.css';

export default function HomePage(props) {

  const logout= ()=>{
    props.setLoginUser({});
  }

  return (
    <div className='homepage'>
        <h1>Hello Home Page</h1>

        <div className='button' onClick={logout}>Logout</div>
    </div>
  );
}
