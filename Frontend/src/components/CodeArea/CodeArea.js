import React, { useState , useEffect} from "react";
import axios from "axios";

// Project Imports
import InputWindow from "./InputWindow";
import OutputWindow from "./OutputWindow";
import Header from "./Header";
import "./styles.css";
import CodeEditor from "./CodeEditor";
import {io} from 'socket.io-client'

export default function CodeArea({socket, id}) {
    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [outputLogs, setOutputLogs] = useState("");
    const [status, setStatus] = useState("Run");

    // var socket;

    // useEffect(() => {
    //     socket = io('http://localhost:9002/', {
    //   transports: ['websocket'],
    // })

    // }, []);
  
    // run button callback
    const runCode = () => {
      setStatus("Loading...");
      console.log("Hello1");
      axios.post("http://localhost:9002/runCode", { language, code, input }).then((res) => {
        console.log("Hello");
        if (res.data.memory && res.data.cpuTime) {
          setOutputLogs("");
          setOutputLogs(
            `Memory Used: ${res.data.memory} \nCPU Time: ${res.data.cpuTime} \n${res.data.output} `
          );
        } else {
          setOutputLogs(`${res.data.output} `);
        }
        setStatus("Run");
      });
    };

    const x= (text) => {
      setCode(text);
      const messageData = {
        room: id,
        cod: text
      };
      socket.emit('code', messageData);
      console.log("code "+text);
    }

    const y= (text) => {
      setInput(text);
      const messageData = {
        room: id,
        cod: text
      };
      socket.emit('input_code', messageData);
      //console.log("code "+text);
    }

    const z= (text) => {
      setOutputLogs(text);
      const messageData = {
        room: id,
        cod: text
      };
      socket.emit('output_code', messageData);
      console.log("output"+text);
    }

    useEffect(() => {
      if(socket== null) return;
      socket.on('receive_code', function(data){
          setCode(data);
      })
      socket.on('receive_input', function(data){
        setInput(data);
    })

    socket.on('receive_output', function(data){
      console.log("Reveived: "+data);
      setOutputLogs(data);
      console.log("data set: "+data);
  })
    
  }, [socket, OutputWindow]);
  
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Header
          value={language}
          status={status}
          runCode={() => runCode()}
          onChangeLanguage={({ value }) => setLanguage(value)}
        />
        <CodeEditor
          value={code}
          onCodeChange={x}
          programmingLanguage={language}
        />
        <div className="optionSegment">
          <InputWindow value={input} onInputChange={y} />
          <OutputWindow value={outputLogs} onOutputChange={z} socket={socket} id={id}/>
        </div>
      </div>
    );
}
