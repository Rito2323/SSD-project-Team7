import React, { useState } from 'react'
//import App from '../../App';
//import React, { Component } from "react";
import '../../App.css';
import { Link } from 'react-router-dom'

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allUser, setAllUser] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Inside submit form.");        
        const newUser = { email: email, password: password };
        setAllUser([...allUser, newUser]);
        if (props.setParticipantEmail) {
            console.log("saving Participant in local storage.");
            localStorage.setItem("participantUser", email);
            props.setParticipantEmail(true);
        } else {
            console.log("saving user in local storage.");
            localStorage.setItem("currentUser", email);
        }
        console.log(allUser)
    }

    return (
        <div className="loginWrapper">
            <form className="login" action="" onSubmit={submitForm}>
                <h1 className="loginHeading">LOGIN</h1>
                <div className="eid">
                    <label className="email login-label" hrtmlFor="email"></label><br></br>
                    <input className="emailInput" type="text" name="email" id="email" autoComplete="off" value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL ID"
                    />
                    <br />
                </div>
                <div className="eid">
                    <label className="email login-label" hrtmlFor="password"></label><br />
                    <input className="passwordInput" type="password" name="password" id="password" autoComplete="off" value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD"
                    />
                </div>
                <div className="btn">
                    {
                        props.setParticipantEmail == undefined ?
                            <Link to='/'>
                                <button className="login-button" type="submit" onClick={(e) => {
                                    console.log("In 48");
                                    if (props.setParticipantEmail) {
                                        console.log("saving Participant in local storage.");
                                        localStorage.setItem("participantUser", email);
                                        props.setParticipantEmail(true);
                                    } else {
                                        console.log("saving user in local storage.");
                                        localStorage.setItem("currentUser", email);
                                    }                                
                                    if (props.setHasLoggedIn && props.setParticipantEmail == undefined) {
                                        props.setHasLoggedIn(true);
                                    }
                                }}>LOGIN</button></Link> : <Link to={'/survey/'+props.surveyNo}>
                                <button className="login-button" type="submit" onClick={(e) => {
                                    console.log("In 54");
                                    if (props.setParticipantEmail) {
                                        console.log("saving Participant in local storage.");
                                        localStorage.setItem("participantUser", email);
                                        props.setParticipantEmail(true);
                                    } else {
                                        console.log("saving user in local storage.");
                                        localStorage.setItem("currentUser", email);
                                    }
                                    if (props.setParticipantEmail) {
                                        props.setParticipantEmail(true);
                                    }}}>LOGIN</button></Link>
                    }
                </div>
            </form>
        </div>
    )
}
export default Login;