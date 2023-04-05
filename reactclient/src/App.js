import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
import DetailedView from "./Components/DetailedView";
import Picture from "./Components/Picture";
import AddMachine from "./Components/AddMachine";
import Reports from "./Components/Reports";

function App() {

    return (
        <Router>
          <Header />
     
            <Routes>
              <Route path="/" element={<Picture />} />
              <Route path="/detailed-view/:machine" element={<DetailedView />} />
              <Route path="/add-machine" element={<AddMachine />} />
              <Route path="/reports" element={<Reports />} />
    
            </Routes>
        
        </Router>
      );
    }

export default App;
