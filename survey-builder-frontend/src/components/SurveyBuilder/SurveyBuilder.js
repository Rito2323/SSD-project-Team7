import '../../App.css';
import SurveyTitleBlock from './SurveyTitleBlock';
import PreviewSurveyTitleBlock from './PreviewSurveyTitleBlock';
import React, {useState, useEffect} from "react";
import QuestionEditListBlock from './Questions/QuestionEditListBlock';
import PreviewQuestionListBlock from './Questions/PreviewQuestionListBlock';
import SurveyTile from '../Utility/SurveyTile';
import Navigation from '../Navigation';


const backendUri = "http://localhost:3000/";
const frontendUri = "http://localhost:3001/";


const getAllSurveys = async (userEmail) => {
  const uri = backendUri + "surveys";
  var response = await fetch(uri)
  var surveys = await response.json();
  var surveysForUser = surveys.filter((survey) => survey.CreatedBy == userEmail);
  console.log("SURVEYS FETCHED For User : ");
  console.log(surveysForUser);
  return surveysForUser;
}

const getData = async () => {

  // var response = await fetch('http://localhost:3000/surveys')
  // var question = await response.json();

  // return {Questions: question["Questions"]}
  return {
    Questions: [
    {
      QuestionType: 4,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
      QuestionNo: 1, // Number
      QuestionText: "This is a dummy question", //string
      Options: [ // list of Option
          {
            name: "option1",
            levels: ["low", "mid", "high"]
          },
          {
            name: "option2",
            levels: ["low", "mid", "high"]
          }
        ]
      },
      {
        QuestionType: 3,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
        QuestionNo: 2, // Number
        QuestionText: "This is a dummy question", //string
        Options: [ // list of Option
            {
              name: "option1",
              levels: ["low", "mid", "high"]
            },
            {
              name: "option2",
              levels: ["low", "mid", "high"]
            }
          ]
      }
  ]}
}

const addSurveyDataInServer = (questionData, oldSurvey) => {
  // Send update request
  const uri = backendUri + "add_survey";
  const newSurveyBody = {
    ...oldSurvey,
    Questions : questionData["Questions"]
  }
  console.log("NEW QUESTION");
  console.log(newSurveyBody);
  fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...newSurveyBody})
  }).then(()=>{alert("New Survey Saved Successfully!")
})
}

const updateQuestionDataInServer = (questionData, oldSurvey) => {
  // Send update request
  const uri = backendUri + "update/survey/" + oldSurvey.SurveyNo;
  const newSurveyBody = {
    ...oldSurvey,
    Questions : questionData["Questions"]
  }
  console.log("NEW QUESTION");
  console.log(newSurveyBody);
  fetch(uri, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...newSurveyBody})
  }).then(()=>{alert("Saved Successfully!")
})
}

const getNewSurveyNo = (surveys) => {
    var max = 0;
    for(var i = 0; i < surveys.length; i++) {
      if(surveys[i].SurveyNo > max) {
        max = surveys[i].SurveyNo;
      }
    }
    return (max + 1);
}

function SurveyBuilder(props) {
  const [value, setValue] = useState("Untitled Form");
  const [questionData, setQuestionData] = useState({Questions: []});
  const [surveys, setSurveys] = useState([]);
  const [mode, setMode] = useState("EDIT");
  const [isSurveySelected, setIsSurveySelected] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({});
  const [isNewSurvey, setIsNewSurvey] = useState(false);

  const userName = "user1@students.iiit.ac.in"; // NEED to get this from login

  useEffect(() => {
    if (surveys.length == 0) {
        getDataFromBackEnd();
      }
    }, []);

  useEffect(() => {
  if (surveys.length == 0) {
      getDataFromBackEnd();
    }
  }, [surveys, isSurveySelected]);

  const getDataFromBackEnd = async () => {
    var surveyData = await getAllSurveys(userName);
    setSurveys(surveyData);
    var data = await getData();
    console.log(data);
    setQuestionData(data);
  }

  const newSurveyNo = getNewSurveyNo(surveys);

  const surveyTiles = [];

  const createSurveyTile = <SurveyTile newSurveyNo={newSurveyNo}
  setIsSurveySelected={setIsSurveySelected}
  setQuestionData={setQuestionData}
  setCurrentSurvey={setCurrentSurvey}
  setIsNewSurvey={setIsNewSurvey}
  currentUser={userName}/>
  surveyTiles.push(<li>{createSurveyTile}</li>)

  for(var i = 0; i < surveys.length; i++) {
    const surveyTileComponent = <SurveyTile survey={{...surveys[i]}}
    setIsSurveySelected={setIsSurveySelected}
    setQuestionData={setQuestionData}
    setCurrentSurvey={setCurrentSurvey}
    setIsNewSurvey={setIsNewSurvey}
    currentUser={userName}/>;
    surveyTiles.push(<li>{surveyTileComponent}</li>)
  }

  console.log("Inside SurveyBuilder")
  console.log(questionData)
  // var questionData = ;
  return (
    <>
    <Navigation/>
    <div className="App SurveyBuilder">
       {!isSurveySelected ? <>
        <ul className="survey-tile-list">
          {surveyTiles}
        </ul>
       </> : 
       <>
        {mode == "EDIT" ? <>
        <SurveyTitleBlock titleVal={value} handleTitleChange={
          (e) => setValue(e.target.value)
        }/>
        <QuestionEditListBlock {...questionData} setQuestionData={setQuestionData}/></>
        : <>
          <PreviewSurveyTitleBlock titleVal={value} handleTitleChange={
          (e) => setValue(e.target.value)
          }/>
            <PreviewQuestionListBlock {...questionData} setQuestionData={setQuestionData}/>
        </>
        }
        <button className="PreviewEditButton" onClick={() => {
          if(mode == "EDIT") {
            setMode("PREVIEW")
          } else {
            setMode("EDIT")
          }
        }}>{mode == "PREVIEW" ? "EDIT" : "PREVIEW"}</button>
        <button className="SaveButton" onClick={(e) => {
          if(isNewSurvey) {
            addSurveyDataInServer(questionData, currentSurvey);
          }
          else {
            updateQuestionDataInServer(questionData, currentSurvey);
          }
          }}>SAVE</button>
        <button className="DiscardButton" onClick={(e)=> {
          setIsSurveySelected(false);
        }}>DISCARD</button>
       </>}
    </div>
    </>
  );
}

export default SurveyBuilder;
