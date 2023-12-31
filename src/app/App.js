import React from "react";
import HomePage from "../pages/Home";
import {Route, Routes} from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

function App() {
    return (
        <div>
            <Routes >
                {/* <Route exact path='/' element={<SignIn/>}/> */}
                <Route exact path='/su' element={<SignUp/>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/h' element={<HomePage/>}/>
                <Route path='/da' element={<Dashboard/>}/>
            </Routes>
        </div>

    );
}

export default App;
