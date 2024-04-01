import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './style.css';
import RegisterPage from './RegisterPage';
import Home from "./Home";
import Login from "./Login";
import Generator from "./Generator";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');

ReactDOM.render(
    <HashRouter basename="/">
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <ToastContainer />
    </HashRouter>,
    container
);
