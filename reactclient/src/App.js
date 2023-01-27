
import React from "react";
import "./App.css";
import Carousel from "./Components/Carousel";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route,Routes, Switch, Link } from 'react-router-dom';
import DetailedView from "./Components/DetailedView";

function App() {

    return (
        <Router>
            <div>
                <Header />
                <div className="App center-div">
                <Routes>
                        <Route path="/" element={<Carousel />} />
                        <Route path="/detailed-view/:machine" element={<DetailedView/>} />
                </Routes>
            </div>
          
               
            </div>
        </Router>
    );
}

export default App;

