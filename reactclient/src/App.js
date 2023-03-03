
import React, { Component } from "react";
import { useState } from 'react';

import "./App.css";
import Carousel from "./Components/Carousel";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route,Routes, Switch, Link } from 'react-router-dom';
import DetailedView from "./Components/DetailedView";
import Container from '@mui/material/Container';


function App() {
    const [machine, setMachine] = useState('');

 

    return (
        <div>
      
        <Router>
                <Header />
                <div >
                <Routes>
                        <Route path="/" element={<Carousel  />} />
                        <Route path="/detailed-view/:machine" element={ <DetailedView />} />
                </Routes>
            </div>
        </Router>
      
        </div>
    );
}

export default App;

