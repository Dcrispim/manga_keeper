import React, { useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PopUp from "./components/PopUp";
import Extension from "./components/Extenson";
import Viewer from "./components/Viewer";

function App() {
  const onExtension = useMemo(() => {
    return window.location.href.includes('http://localhost/');
  }, []);
  return <div className="App">{onExtension ? <Extension /> : <Viewer />}</div>;
}

export default App;
