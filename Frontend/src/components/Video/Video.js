import React, { useEffect } from 'react'
import './Video.css'
import { io } from 'socket.io-client'
import Peer from 'peerjs';


let videoGrid;


const socket = io.connect("http://localhost:9002");

const peer = new Peer();
//addVideoStream
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
    //videoGrid.appendChild(video);

}



export default function Video({ roomId }) {
    let myVideoStream;
    useEffect(() => {


        videoGrid = document.getElementById('video-grid');
        console.log(videoGrid);
        const myVideo = document.createElement('video');
        myVideo.muted = true;

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            myVideoStream = stream;
            addVideoStream(myVideo, stream);

            console.log("h!!!!");
            peer.on('call', call => {
                call.answer(stream)
                const video = document.createElement('video')
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })

            })

            console.log("he");


            socket.on('user-connected', function (userId) {
                connectToNewUser(userId, stream); //userId, stream
                console.log("other user: " + userId);
            })
        })
    }, [socket]);


    useEffect(() => {
        peer.on('open', id => {
            socket.emit("join-video-room", roomId, id);
            console.log(id);
        })

    }, []);

    // useEffect(() => {
    //     console.log("h!!!!");
    //     peer.on('call', (call) => {
    //         navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
    //           call.answer(stream); // Answer the call with an A/V stream.
    //           const video = document.createElement('video')
    //           call.on('stream', (remoteStream) => {
    //             // Show stream in some <video> element.
    //             addVideoStream(video, remoteStream)
    //           });
    //         }, (err) => {
    //           console.error('Failed to get local stream', err);
    //         });
    //       });
    // },[]);

    const connectToNewUser = (userId, stream) => {
        // console.log(userId);
        const call = peer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    }

    const muteUnmute = () => {
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        console.log("myVideoStream :"+myVideoStream);
        console.log("enabled: "+enabled);
        if (enabled) {
            myVideoStream.getAudioTracks()[0].enabled = false;
            setUnmuteButton();
        } else {
            setMuteButton();
            myVideoStream.getAudioTracks()[0].enabled = true;
        }
    }

    const playStop = () => {
        console.log('object')
        let enabled = myVideoStream.getVideoTracks()[0].enabled;
        if (enabled) {
            myVideoStream.getVideoTracks()[0].enabled = false;
            setPlayVideo()
        } else {
            setStopVideo()
            myVideoStream.getVideoTracks()[0].enabled = true;
        }
    }

    const setMuteButton = () => {
        const html = `
          <i class="fas fa-microphone"></i>
          <span>Mute</span>
        `
        document.querySelector('.main__mute_button').innerHTML = html;
    }

    const setUnmuteButton = () => {
        const html = `
          <i class="unmute fas fa-microphone-slash"></i>
          <span>Unmute</span>
        `
        document.querySelector('.main__mute_button').innerHTML = html;
    }

    const setStopVideo = () => {
        const html = `
          <i class="fas fa-video"></i>
          <span>Stop Video</span>
        `
        document.querySelector('.main__video_button').innerHTML = html;
    }

    const setPlayVideo = () => {
        const html = `
        <i class="stop fas fa-video-slash"></i>
          <span>Play Video</span>
        `
        document.querySelector('.main__video_button').innerHTML = html;
    }

    return (
        <>
            <div id="video-grid"></div>
            {/* <div id="1"></div> */}

            <div className="main__controls">
                <div className="main__controls__block">
                    <div onClick={muteUnmute} className="main__controls__button main__mute_button">
                        <i className="fas fa-microphone"></i>
                        <span>Mute</span>
                    </div>
                    <div onClick={playStop} className="main__controls__button main__video_button" >
                        <i className="fas fa-video"></i>
                        <span>Stop Video</span>
                    </div>
                </div>

            </div>


        </>
    )


}
