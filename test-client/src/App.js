import React from 'react';
import {Route, Routes} from "react-router-dom";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import Dashboard from "./components/Dashboard";

const App = () => {
    return (
        <div>
            <div style={{position: "absolute", top: "20px"}}>
                <Navbar/>
            </div>
            <div className="container">
                <Routes>
                    {/*<Route element={} path="">Dashboard</Route>*/}
                    <Route path={"/"} element={<Dashboard/>}>Dashboard</Route>
                    <Route path={"/category"} element={<Category/>}>Category</Route>
                    {/*<Route element={} path="">Product</Route>*/}
                    {/*<Route element={} path="">Order</Route>*/}
                    {/*<Route element={} path="">Client</Route>*/}
                </Routes>
            </div>
        </div>
    );
};

export default App;