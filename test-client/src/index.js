import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export const baseURL = "http://localhost/api/"
ReactDOM.render(
    <Router>
        <App/>
        <ToastContainer/>
    </Router>,
    document.getElementById('root')
)
;
