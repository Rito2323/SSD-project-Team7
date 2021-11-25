import React from 'react';
import './App.css';
import SurveyBuilder from './components/SurveyBuilder/SurveyBuilder';
import DashBoard from './components/DashBoard';
import ParticipantView from './components/ParticipantView/PartcipantView';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/buildsurvey" element={<SurveyBuilder/>}/>
          <Route path="/survey/:id" element={<ParticipantView/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
