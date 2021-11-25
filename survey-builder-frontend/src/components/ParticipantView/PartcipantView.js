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

const getQuestionHeaderKey = (questions, questionNo, optionName = undefined) => {
    //TODO : check for error.
    const question = questions[questionNo - 1];
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
    console.log("PARTICIPANTVIEW");
    const participantEmail = "user1@students.iiit.ac.in"  // NEED to get this from login
    const [survey, setSurvey] = useState({});
    const [responseData, setResponseData] = useState({});
    var { id } = useParams();
    const surveyNo = id;
    useEffect(() => {
        // if (surveys.length == 0) {
        // if(survey === {}){
        getDataFromBackEnd();
        // }
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
                        const quesHeaderKey = getQuestionHeaderKey(survey["Questions"], i + 1, survey["Questions"][i]["Options"][j]["name"]);
                        answers[quesHeaderKey] = "";
                    }
                } else {
                    const quesHeaderKey = getQuestionHeaderKey(survey["Questions"], i + 1);
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
                    resCopy["Answer"][questionKey] = newAnswer;
                    setResponseData(resCopy);
            }} />);
        }

        return (<div className="QuestionEditListBlock">
            <PreviewSurveyTitleBlock titleVal={survey["SurveyTitle"]} />
            {questionsElements}
            <button className="submit-button" onClick={()=>{
                console.log(responseData);
            }}>SUBMIT</button>
        </div>)
    } else {
        return <><PreviewSurveyTitleBlock titleVal={"404: Survey not found."} />
        </>
    }

    //    const surveyNo = props.match.id;
    //    const survey = getSurvey(surveyNo);
    // console.log(survey);
    // return (<p>{surveyNo}</p>);
}

export default ParticipantView;

// import '../../App.css';
// import SurveyTitleBlock from './SurveyTitleBlock';
// import PreviewSurveyTitleBlock from './PreviewSurveyTitleBlock';
// import React, {useState, useEffect} from "react";
// import QuestionEditListBlock from './Questions/QuestionEditListBlock';
// import PreviewQuestionListBlock from './Questions/PreviewQuestionListBlock';
// import SurveyTile from '../Utility/SurveyTile';
// import Navigation from '../Navigation';



// const getData = async () => {

//   // var response = await fetch('http://localhost:3000/surveys')
//   // var question = await response.json();

//   // return {Questions: question["Questions"]}
//   return {
//     Questions: [
//     {
//       QuestionType: 4,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
//       QuestionNo: 1, // Number
//       QuestionText: "This is a dummy question", //string
//       Options: [ // list of Option
//           {
//             name: "option1",
//             levels: ["low", "mid", "high"]
//           },
//           {
//             name: "option2",
//             levels: ["low", "mid", "high"]
//           }
//         ]
//       },
//       {
//         QuestionType: 3,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
//         QuestionNo: 2, // Number
//         QuestionText: "This is a dummy question", //string
//         Options: [ // list of Option
//             {
//               name: "option1",
//               levels: ["low", "mid", "high"]
//             },
//             {
//               name: "option2",
//               levels: ["low", "mid", "high"]
//             }
//           ]
//       }
//   ]}
// }

// const addSurveyDataInServer = (questionData, oldSurvey) => {
//   // Send update request
//   const uri = backendUri + "add_survey";
//   const newSurveyBody = {
//     ...oldSurvey,
//     Questions : questionData["Questions"]
//   }
//   console.log("NEW QUESTION");
//   console.log(newSurveyBody);
//   fetch(uri, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({...newSurveyBody})
//   }).then(()=>{alert("New Survey Saved Successfully!")
// })
// }

// const updateQuestionDataInServer = (questionData, oldSurvey) => {
//   // Send update request
//   const uri = backendUri + "update/survey/" + oldSurvey.SurveyNo;
//   const newSurveyBody = {
//     ...oldSurvey,
//     Questions : questionData["Questions"]
//   }
//   console.log("NEW QUESTION");
//   console.log(newSurveyBody);
//   fetch(uri, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({...newSurveyBody})
//   }).then(()=>{alert("Saved Successfully!")
// })
// }

// const getNewSurveyNo = (surveys) => {
//     var max = 0;
//     for(var i = 0; i < surveys.length; i++) {
//       if(surveys[i].SurveyNo > max) {
//         max = surveys[i].SurveyNo;
//       }
//     }
//     return (max + 1);
// }

// function SurveyBuilder(props) {
//   const [value, setValue] = useState("Untitled Form");
//   const [questionData, setQuestionData] = useState({Questions: []});
//   const [surveys, setSurveys] = useState([]);
//   const [mode, setMode] = useState("EDIT");
//   const [isSurveySelected, setIsSurveySelected] = useState(false);
//   const [currentSurvey, setCurrentSurvey] = useState({});
//   const [isNewSurvey, setIsNewSurvey] = useState(false);

//   const userName = "user1@students.iiit.ac.in"; // NEED to get this from login

//   useEffect(() => {
//     if (surveys.length == 0) {
//         getDataFromBackEnd();
//       }
//     }, []);

//   useEffect(() => {
//   if (surveys.length == 0) {
//       getDataFromBackEnd();
//     }
//   }, [surveys, isSurveySelected]);

//   const getDataFromBackEnd = async () => {
//     var surveyData = await getAllSurveys(userName);
//     setSurveys(surveyData);
//     var data = await getData();
//     console.log(data);
//     setQuestionData(data);
//   }

//   const newSurveyNo = getNewSurveyNo(surveys);

//   const surveyTiles = [];

//   const createSurveyTile = <SurveyTile newSurveyNo={newSurveyNo}
//   setIsSurveySelected={setIsSurveySelected}
//   setQuestionData={setQuestionData}
//   setCurrentSurvey={setCurrentSurvey}
//   setIsNewSurvey={setIsNewSurvey}
//   currentUser={userName}/>
//   surveyTiles.push(<li>{createSurveyTile}</li>)

//   for(var i = 0; i < surveys.length; i++) {
//     const surveyTileComponent = <SurveyTile survey={{...surveys[i]}}
//     setIsSurveySelected={setIsSurveySelected}
//     setQuestionData={setQuestionData}
//     setCurrentSurvey={setCurrentSurvey}
//     setIsNewSurvey={setIsNewSurvey}
//     currentUser={userName}/>;
//     surveyTiles.push(<li>{surveyTileComponent}</li>)
//   }

//   console.log("Inside SurveyBuilder")
//   console.log(questionData)
//   // var questionData = ;
//   return (
//     <>
//     <Navigation/>
//     <br/>
//     <div className="App SurveyBuilder">
//        {!isSurveySelected ? <>
//         <ul className="survey-tile-list">
//           {surveyTiles}
//         </ul>
//        </> : 
//        <>
//         {mode == "EDIT" ? <>
//         <SurveyTitleBlock titleVal={value} handleTitleChange={
//           (e) => setValue(e.target.value)
//         }/>
//         <QuestionEditListBlock {...questionData} setQuestionData={setQuestionData}/></>
//         : <>
//           <PreviewSurveyTitleBlock titleVal={value} handleTitleChange={
//           (e) => setValue(e.target.value)
//           }/>
//             <PreviewQuestionListBlock {...questionData} setQuestionData={setQuestionData}/>
//         </>
//         }
//         <button className="PreviewEditButton" onClick={() => {
//           if(mode == "EDIT") {
//             setMode("PREVIEW")
//           } else {
//             setMode("EDIT")
//           }
//         }}>{mode == "PREVIEW" ? "EDIT" : "PREVIEW"}</button>
//         <button className="SaveButton" onClick={(e) => {
//           if(isNewSurvey) {
//             addSurveyDataInServer(questionData, currentSurvey);
//           }
//           else {
//             updateQuestionDataInServer(questionData, currentSurvey);
//           }
//           }}>SAVE</button>
//         <button className="DiscardButton" onClick={(e)=> {
//           setIsSurveySelected(false);
//         }}>DISCARD</button>
//        </>}
//     </div>
//     </>
//   );
// }

// export default SurveyBuilder;
