import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './style.css';
import RegisterPage from './RegisterPage';
import Home from "./Home";
import Login from "./Login";


const container = document.getElementById('root');

ReactDOM.render(
    <HashRouter basename="/">
        <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </HashRouter>,
    container
);
