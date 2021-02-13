import React from "react";
import './App.css';
import Router from "./Componentes/Router/Router";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
