import React from 'react';
import { ReactMediaRecorder } from "react-media-recorder";

const Recording = () => (
  <div>
    <ReactMediaRecorder
      screen
      render={({ status, startRecording, stopRecording, pauseRecording, resumeRecording, muteAudio, unmuteAudio, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <button onClick={pauseRecording}>Pause Recording</button>
          <button onClick={resumeRecording}>Resume Recording</button>
          <button onClick={muteAudio}>Mute Audio</button>
          <button onClick={unmuteAudio}>Unmute Audio</button>
          <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
      )}
      
    />
  </div>
);

export default Recording;
