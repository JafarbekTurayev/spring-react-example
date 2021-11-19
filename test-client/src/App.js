import React from 'react';
import {Route, Routes} from "react-router-dom";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import Dashboard from "./components/Dashboard";
import Client from "./components/Client";
import Product from "./components/Product";
import Order from "./components/Order";

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
                    <Route path={"/user"} element={<Client/>}>Category</Route>
                    <Route path={"/product"} element={<Product/>}>Product</Route>
                    <Route path={"/order"} element={<Order/>}>Order</Route>
                </Routes>
            </div>
        </div>
    );
};

export default App;