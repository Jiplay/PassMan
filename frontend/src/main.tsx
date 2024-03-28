import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './style.css';
import App from './App';
import Home from "./Home";

const container = document.getElementById('root');

ReactDOM.render(
    <HashRouter basename="/">
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </HashRouter>,
    container
);
