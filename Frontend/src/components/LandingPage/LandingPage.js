import React, { useState } from 'react'
import "./LandingPage.css"
import Navbar from '../navbar/Navbar';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
//import {io} from 'socket.io-client'
// import { validate } from 'uuid-validate';

//const socket = io('http://localhost:9002/');
export default function LandingPage(props) {

    const navigate = useNavigate(); //created an instance

    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const [roomId, setRoomId] = useState('');

    const handleChange = (e) => {
        const id= e.target.value;
        
        setRoomId(id);
        console.log(roomId);
    };

    const startCall = () => {
        alert('Starting call');
        
        axios.post("http://localhost:9002/create-new-room")
                .then(res => {
                    alert(res.data);
                    const id= res.data;
                    setRoomId(id);
                    console.log(id);
                    //88
                    //socket.emit("Join_room", id);
                    navigate("./interviewroom/"+id);
        });

        
    };

    const joinCall = () => {
        const id= roomId;
        if(regexExp.test(id)){
            alert(id);
            //socket.emit("Join_room", id);
            navigate("./interviewroom/"+id);
        }
        else{
            alert("Please enter a proper Meeting Id.");
        }
    }

    const setLoginUser = props.setLoginUser;
    // $('#join').submit(function(e) {
    //     e.preventDefault();
    //     // Coding
    //     $('#exampleModal').modal('toggle'); //or  $('#IDModal').modal('hide');
    //     return false;
    // });

    return (
        <>
            
            <Navbar setLoginUser={setLoginUser} />
            <div className='heading text-center'>
                <h1 className='my-3'>Hey {props.user.name}!</h1>
                <h1>Welcome to InterviewGuide!!</h1>
            </div>

            <div className="container d-flex">
                <div className="float-left">
                        InterviewGuide is a web app for taking online coding interviews. It provides a good and easy solution for software interviews held in online mode.
                    <div>
                        <button className="btn btn-info my-4" onClick={startCall}>
                            New Meeting
                        </button>
                    </div>

                    <div className='my-3'>

                        <input onChange={handleChange} placeholder="Enter a code" />
                    
                    <button className="btn btn-info mx-2" onClick={joinCall}> Join </button>

                </div>
            </div>


            {/* <div className="container d-flex">
                <div className="float-right">
                        <img  className="im" src='landingPage.jpg'/>

                </div>
            </div> */}

        </div>

        </>
    )
}
