import React, { useState, useEffect } from 'react'
import App from '../../App';
import './response.css';
import JsonDataDisplay from './Response'

const backendUri = "http://localhost:3000/";

const getSurveysForUser = async () => {
    const uri = backendUri + "surveys";
    var response = await fetch(uri)
    var surveys = await response.json();
    // console.log(surveys);
    // var surveysForUser = surveys.filter((survey) => survey.CreatedBy == userEmail);
    // console.log("SURVEYS FETCHED For User : ");
    // console.log(surveysForUser);
    // console.log(surveyNo)
    return surveys;
}

function Surveyno(props) {
    const [Surveyno, setSurveyNo] = useState("");
    const [Surveys, setSurveys] = useState([]);
    const [isSurveyNoSelected, setisSurveyNoSelected] = useState(false);


    const submitForm = (e) => {
        e.preventDefault();
        const newSur = { surveyNo: Surveyno };
        setisSurveyNoSelected(true);
        console.log(newSur)
        
    }

    useEffect(() => {
        getDataFromBackEnd();
    }, []);

    const getDataFromBackEnd = async () => {
        var surveys = await getSurveysForUser();
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
        <>{isSurveyNoSelected ? <JsonDataDisplay/> :
            <>
            <form className="survey" action="" onSubmit={submitForm}>
            <div>
                <label className="email" hrtmlFor="email">Select the survey number</label><br></br>

                {/* <input type="radio" id="s1" name="S1" value="1" onClick={(e) => setSurveyNo(e.target.value)} />
                <label > Survey 1</label><br />
                <input type="radio" id="s2" name="S2" value="2" onClick={(e) => setSurveyNo(e.target.value)} />
                <label> Survey 2</label><br />
                <input type="radio" id="s3" name="S3" value="3" onClick={(e) => setSurveyNo(e.target.value)} />
                <label> Survey 3</label><br /><br /> */}
                {surveyNos}
            </div>
            <div className="btn">
                <button type="submit">Show</button>
            </div>
        </form></>
        }</>);
}
export default Surveyno;