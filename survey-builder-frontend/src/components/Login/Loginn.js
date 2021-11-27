import React, { useState } from 'react'
import App from '../../App';
//import React, { Component } from "react";
import './login.css';
import { Link } from 'react-router-dom'

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allUser, setAllUser] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();
        const newUser = { email: email, password: password };
        setAllUser([...allUser, newUser]);
        if (props.setParticipantEmail) {
            localStorage.setItem("participantUser", email);
            props.setParticipantEmail(true);
        } else {
            localStorage.setItem("currentUser", email);
        }
        console.log(allUser)
    }

    return (
        <form className="login" action="" onSubmit={submitForm}>
            <div className="eid">
                <label className="email login-label" hrtmlFor="email">EMAIL ID</label><br></br>
                <input type="text" name="email" id="email" autoComplete="off" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
            </div>
            <div className="eid">
                <label className="email login-label" hrtmlFor="password">PASSWORD</label><br />
                <input type="password" name="password" id="password" autoComplete="off" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="btn">
                {
                    props.setParticipantEmail == undefined ?
                        <Link to='/'>
                            <button className="login-button" type="submit" onClick={(e) => {
                                if (props.setHasLoggedIn && props.setParticipantEmail == undefined) {
                                    props.setHasLoggedIn(true);
                                }
                            }}>LOGIN</button></Link> : <Link to={'/survey/'+props.surveyNo}>
                            <button className="login-button" type="submit" onClick={(e) => {
                                if (props.setParticipantEmail) {
                                    props.setParticipantEmail(true);
                                }}}>LOGIN</button></Link>
                }
            </div>
        </form>
    )
}
export default Login;