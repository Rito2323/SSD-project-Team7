import React, {useState} from 'react'
import './App.css';
import SurveyBuilder from './components/SurveyBuilder/SurveyBuilder';
import DashBoard from './components/DashBoard';
import ParticipantView from './components/ParticipantView/PartcipantView';
import Transcript from './components/Transcript/transcript'
import Login from './components/Login/Loginn'
import Surveyno from './components/Responses/ResponseUI'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  return (
    <Router>
      <div className="App">
        <Routes>
          {localStorage.getItem("currentUser") || hasLoggedIn ? 
          <>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<DashBoard/>}/>
                <Route path="/buildsurvey" element={<SurveyBuilder/>}/>
                <Route path="/transcript" element={<Transcript/>}/>
                <Route path="/survey/:id" element={<ParticipantView/>} />
                <Route path="/responses" element={<Surveyno/>}/>
          </>
          :
          <>
                <Route path="/login" element={<Login setHasLoggedIn={setHasLoggedIn}/>}/>
                <Route path="/" element={<Login setHasLoggedIn={setHasLoggedIn}/>}/>
                <Route path="/buildsurvey" element={<Login setHasLoggedIn={setHasLoggedIn}/>}/>
                <Route path="/transcript" element={<Login setHasLoggedIn={setHasLoggedIn}/>}/>
                <Route path="/survey/:id" element={<Login setHasLoggedIn={setHasLoggedIn}/>} />
                <Route path="/responses" element={<Login setHasLoggedIn={setHasLoggedIn}/>}/>          
          </>          
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
