import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import QuestionPreview from '../SurveyBuilder/Questions/QuestionPreview';
import PreviewSurveyTitleBlock from '../SurveyBuilder/PreviewSurveyTitleBlock';
import '../../App.css';

const backendUri = "http://localhost:3000/";
const frontendUri = "http://localhost:3001/";

const getSurvey = async (surveyNo) => {
    const uri = backendUri + "surveys";
    var response = await fetch(uri)
    var surveys = await response.json();
    console.log(surveys);
    // var surveysForUser = surveys.filter((survey) => survey.CreatedBy == userEmail);
    // console.log("SURVEYS FETCHED For User : ");
    // console.log(surveysForUser);
    console.log(surveyNo)
    const survey = surveys.filter((survey) => survey.SurveyNo == surveyNo)[0];
    return survey;
}

const addResponseInServer = () => {

}

const getQuestionHeaderKey = (question, optionName = undefined) => {
    //TODO : check for error.
    // const question = questions[questionNo - 1];
    let quesStr = "";
    if (optionName == undefined) {
        quesStr = question["QuestionText"];
    } else {
        quesStr = question["QuestionText"] + "-" + optionName;
    }
    return quesStr;
}

const isEmptyObject = (obj) => {
    if (!obj)
        return true;
    if (Object.keys(obj).length == 0 && Object.getPrototypeOf(obj) == Object.prototype)
        return true;
    return false;
}

function ParticipantView(props) {
    console.log("PARTICIPANT VIEW");
    const participantEmail = "user2@students.iiit.ac.in"  // NEED to get this from login
    const [survey, setSurvey] = useState({});
    const [responseData, setResponseData] = useState({});
    var { id } = useParams();
    const surveyNo = id;
    useEffect(() => {
        getDataFromBackEnd();
    }, []);

    useEffect(() => {
        if (!isEmptyObject(survey)) {
            const response = {
                SurveyNo: survey["SurveyNo"],
                CreatedBy: survey["CreatedBy"],
                Participants: participantEmail,
                Answers: {}
            };

            // Iterate over questions and set default blank answers.
            let noOfQues = survey["Questions"].length;
            var answers = {};
            for (var i = 0; i < noOfQues; i++) {
                if (survey["Questions"][i]["QuestionType"] == 4) {
                    for (var j = 0; j < survey["Questions"][i]["Options"].length; j++) {
                        const quesHeaderKey = getQuestionHeaderKey(survey["Questions"][i], survey["Questions"][i]["Options"][j]["name"]);
                        answers[quesHeaderKey] = "";
                    }
                } else {
                    const quesHeaderKey = getQuestionHeaderKey(survey["Questions"][i]);
                    answers[quesHeaderKey] = "";
                }
            }
            response["Answers"] = answers;
            setResponseData(response);
        }
    }, [survey]);

    const getDataFromBackEnd = async () => {
        var survey = await getSurvey(surveyNo);
        console.log(survey);
        setSurvey(survey);
    }

    const questionsElements = [];

    if (!isEmptyObject(survey)) {
        const noOfQues = survey["Questions"].length;
        for (var i = 0; i < noOfQues; i++) {
            questionsElements.push(<QuestionPreview key={i} {...survey["Questions"][i]} onValueChange={(questionKey, newAnswer)=>{
                const resCopy = responseData;
                if(resCopy != undefined && resCopy["Answers"] != undefined && resCopy["Answers"][questionKey] != undefined){}
                    resCopy["Answers"][questionKey] = newAnswer;
                    setResponseData(resCopy);
            }} />);
        }

        return (<div className="QuestionEditListBlock">
            <PreviewSurveyTitleBlock titleVal={survey["SurveyTitle"]} />
            {questionsElements}
            <button className="submit-button" onClick={()=>{
                console.log(responseData);
                // call backend here
            }}>SUBMIT</button>
        </div>)
    } else {
        return <><PreviewSurveyTitleBlock titleVal={"404: Survey not found."} />
        </>
    }
}

export default ParticipantView;