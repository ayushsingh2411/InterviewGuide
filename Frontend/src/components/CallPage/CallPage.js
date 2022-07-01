import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
import Whiteboard from '../whiteboard/Whiteboard';
import './CallPage.css'
import HomePage from '../homePage/homePage'
import { io } from 'socket.io-client'
import Chat from '../Chat/Chat'
import Video from '../Video/Video'
import CodeArea from '../CodeArea/CodeArea';
import Recording from '../Recording/Recording';
import { useNavigate } from 'react-router-dom'
import screenshot from 'screenshot-desktop'

const socket = io.connect("http://localhost:9002");

export default function CallPage({ username }) {
  const navigate = useNavigate(); //created an instance

  const { id: documentId } = useParams();
  const [btnText, updatebtnText] = useState("CodeArea");
  // const [share, setShare] = useState("Share Screen");
  const [st, setst] = useState("Online");
  var interval;

  useEffect(() => {
    socket.emit("join_room", documentId);
  });

  // function tabChange(){
  //   document.addEventListener('visibilitychange', function(ev){
  //     if(document.hidden){
  //       setst("Offline");
  //       console.log(st);
  //     }
  //     else{
  //       setst("Online")
  //       console.log("else:"+st);
  //     }
  //   })
  // }
  // useEffect(() => {
  //   tabChange();
  // });

  const copyRoomId = () => {
    let data = documentId;
    //data.select();
    navigator.clipboard.writeText(data);
  }

  const handleWhiteboard = () => {
    if (btnText === "Whiteboard") {
      updatebtnText("CodeArea");
    }
    else {
      updatebtnText("Whiteboard");
    }
  }

//   const handleScreenShare= ()=>{
//     setShare("Stop Sharing");

//     interval= setInterval(function(){
//       screenshot().then((img)=>{
//         var imgStr= new ArrayBuffer(img).toString('base64');

//         var obj={};
//         obj.room= documentId;
//         obj.image= imgStr;

//         socket.emit("screen-data", JSON.stringify(obj));
//         console.log("image sent to the server");
//       })
//     }, 100);
//   }

//   useEffect(() => {
//     if(socket== null) return;
//     socket.on('screen-data', function(data){
//         var image= new Image();
//         var canvas= document.querySelector('#ss');
//         var ctx= canvas.getContext('2d');
//         image.onload= function (){
//             ctx.drawImage(image, 0,0);
//         };
//         image.src= data;
//     })
// }, [socket]);

  const handleRecording= ()=>{
    window.open("http://localhost:3000/record", "_blank", "");
    //navigate("/record");
  }

  const leaveRoom= ()=>{
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          {/* <img src='/docs/5.1/assets/brand/bootstrap-logo.svg' alt="" width="30" height="24" class="d-inline-block align-text-top"/> */}
          <span className="navbar-brand mb-0 h1" style={{ color: '#268daa' }}>InterviewGuide</span>

          <div className="mx-1">
            {/* <span style={{ color: '#268daa' }}>{`Room Id: ${documentId}`}</span> */}
            <span className='mx-2' style={{ color: '#268daa' }}>Candidate({st})</span>
            <button className='mx-1' onClick={copyRoomId}>Copy Room Id</button>
            <span className='mx-2' style={{ color: '#268daa' }}>Interviewer(online)</span>
          </div>
          <div className="d-flex">
            <button className="btn btn-outline-primary mx-2" onClick={handleWhiteboard}>{btnText}</button>
            <button className="btn btn-outline-primary mx-2" onClick={handleRecording}>Record</button>
            {/* <button className="btn btn-outline-primary mx-2" onClick={handleScreenShare}>{share}</button> */}
            <button className="btn btn-outline-primary mx-2" onClick={leaveRoom}>Leave Room</button>
          </div>
        </div>
      </nav>

      {(btnText === 'CodeArea') ?
        <div className='containe'>
          <div className='color-picker-container'>
            <input type="color" />
          </div>

          <div className="board-container">
            <Whiteboard id={documentId} />
          </div>

        </div>
        : <CodeArea socket={socket} id={documentId}/>
      }
      
      <div className='video-grid'>
        <Video roomId={documentId}/>
      </div>

      <Chat socket={socket} username={username} room={documentId} />

    </>
  )
}
