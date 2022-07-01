// Library Imports
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-kuroir';

// Project Imports
import "./styles.css";

const CodeEditor = ({ value, onCodeChange, programmingLanguage }) => {
  const onLoad = () => {
    console.log("code editor loaded");
  };
  return (
    <AceEditor
      className="codeEditor"
      placeholder="Code goes here"
      mode={programmingLanguage}
      theme="monokai"
      name="editor"
      onLoad={onLoad}
      onChange={onCodeChange}
      fontSize={20}
      value={value}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
    //  value={code}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
   // <CodeCompiler code = {code} lang = {language}/>
  );
};

export default CodeEditor;
