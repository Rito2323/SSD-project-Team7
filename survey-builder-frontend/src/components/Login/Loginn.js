import React, {useState} from 'react'
import App from '../../App';
//import React, { Component } from "react";
import '../../App.css';



function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allUser, setAllUser] = useState([]);

    const submitForm = (e)=> {
        e.preventDefault();
        const newUser = {email: email, password: password};
        setAllUser([...allUser, newUser]);

        console.log(allUser)
    }

    return( 
        <form className="login" action="" onSubmit={submitForm}>
            <div className="eid">
                <label className="email" hrtmlFor="email">EMAIL ID</label><br></br>
                <input  type="text" name="email" id="email" autoComplete="off" value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <br/>
            </div>
            <div className="eid">   
                <label className="email" hrtmlFor="password">PASSWORD</label><br/>
                <input type="password" name="password" id="password" autoComplete="off" value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <div className="btn">
            <button type="submit">LOGIN</button>
            </div>
        </form>
    )
}
export default Login;