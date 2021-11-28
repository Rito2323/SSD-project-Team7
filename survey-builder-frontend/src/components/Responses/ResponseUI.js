import React, { useState, useEffect } from 'react'
import './response.css';
import JsonDataDisplay from './Response'
import Navigation from '../Navigation';

const backendUri = "http://localhost:3000/";

const getSurveysForUser = async (userEmail) => {
    const uri = backendUri + "surveys";
    var response = await fetch(uri)
    var surveys = await response.json();
    // console.log(surveys);
    var surveysForUser = surveys.filter((survey) => survey.CreatedBy == userEmail);
    console.log("SURVEYS FETCHED For User : ");
    console.log(surveysForUser);
    // console.log(surveyNo)
    return surveysForUser;
}

function Surveyno(props) {
    const [Surveyno, setSurveyNo] = useState("");
    const [Surveys, setSurveys] = useState([]);
    const [isSurveyNoSelected, setisSurveyNoSelected] = useState(false);
    const currentUser = localStorage.getItem("currentUser");

    const submitForm = (e) => {
        e.preventDefault();
        const newSur = { surveyNo: Surveyno };
        setisSurveyNoSelected(true);
        console.log(newSur)
        
    }

    useEffect(() => {
        getDataFromBackEnd(currentUser);
    }, []);

    const getDataFromBackEnd = async (currentUser) => {
        var surveys = await getSurveysForUser(currentUser);
        console.log(surveys);
        setSurveys(surveys);
    }

    const surveyNos = [];

    for (var i = 0; i < Surveys.length; i++) {
        console.log(i);
        surveyNos.push(<><input type="radio" id={Surveys[i]["SurveyNo"]} name="surveyNo" value={Surveys[i]["SurveyNo"]} onClick={(e) => setSurveyNo(e.target.value)} />
            <label >{Surveys[i]["SurveyTitle"]}</label><br /></>)
    }

    return (
        <>
        <Navigation/>
        {isSurveyNoSelected ? <JsonDataDisplay surveyNo={Surveyno}/> :
            <div className="responseui">
            <form className="survey" action="" onSubmit={submitForm}>
            <div>
                <label className="email" hrtmlFor="email">Select the survey number</label><br></br>
                {surveyNos}
            </div>
            <div className="btn">
                <button type="submit">Show</button>
            </div>
        </form></div>
        }</>);
}
export default Surveyno;