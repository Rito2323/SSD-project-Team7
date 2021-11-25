import React from 'react';
import './App.css';
import SurveyBuilder from './components/SurveyBuilder/SurveyBuilder';
import Navigation from './components/Navigation';
import DashBoard from './components/DashBoard';
import SingleSelectEdit from './components/SurveyBuilder/Questions/SingleSelectEdit'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/buildsurvey" element={<SurveyBuilder/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
