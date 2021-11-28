import '../../App.css';
import SurveyTitleBlock from './SurveyTitleBlock';
import PreviewSurveyTitleBlock from './PreviewSurveyTitleBlock';
import React, {useState, useEffect} from "react";
import QuestionEditListBlock from './Questions/QuestionEditListBlock';
import PreviewQuestionListBlock from './Questions/PreviewQuestionListBlock';
import SurveyTile from '../Utility/SurveyTile';
import Navigation from '../Navigation';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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

const getData = () => {

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

const addSurveyDataInServer = ({SurveyTile, questionData}, oldSurvey, setIsSurveySelected) => {
  // Send update request
  const uri = backendUri + "add_survey";
  const newSurveyBody = {
    ...oldSurvey,
    SurveyTile: SurveyTile,
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
  }).then(()=>{alert("New Survey Saved Successfully!\n Survey url : " + frontendUri + "/survey/" + oldSurvey["SurveyNo"]);
  setIsSurveySelected(false);
})
}

const updateQuestionDataInServer = ({SurveyTile, questionData}, oldSurvey, setIsSurveySelected) => {
  // Send update request
  console.log("Inside updateQuestionDataInServer")
  const uri = backendUri + "update/survey/" + oldSurvey.SurveyNo;
  const newSurveyBody = {
    SurveyNo: oldSurvey.SurveyNo,
    
    SurveyTile: SurveyTile,
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
  }).then(()=>{alert("Saved Successfully!\n Survey url : " + frontendUri + "survey/" + oldSurvey["SurveyNo"]);
  setIsSurveySelected(false);
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
  const [titleValue, setTitleValue] = useState("Untitled Form");
  const [questionData, setQuestionData] = useState({Questions: []});
  const [surveys, setSurveys] = useState([]);
  const [mode, setMode] = useState("EDIT");
  const [isSurveySelected, setIsSurveySelected] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({});
  const [isNewSurvey, setIsNewSurvey] = useState(false);

  const userName = localStorage.getItem("currentUser"); // NEED to get this from login

  useEffect(() => {
    if (surveys.length == 0) {
        getDataFromBackEnd();
      }
    }, []);

  useEffect(() => {
  if (surveys.length == 0) {
     // getDataFromBackEnd();
    }
  }, [surveys, isSurveySelected]);

  const getDataFromBackEnd = async () => {
    var surveyData = await getAllSurveys(userName);
    setSurveys(surveyData);
    // var data = await getData();
    // console.log(data);
    // setQuestionData(data);
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
  return (
    <>
    {/* <Modal show={true} onHide={()=>{}}>
        <Modal.Header closeButton>
          <Modal.Title>Saved Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Survey Link To Share: {frontendUri + "survey/"+ currentSurvey["SurveyNo"]}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    <Navigation/>
    <div className="App SurveyBuilder">
       {!isSurveySelected ? <>
        <ul className="survey-tile-list">
          {surveyTiles}
        </ul>
       </> :
       <>
        {mode == "EDIT" ? <>
        <SurveyTitleBlock titleVal={titleValue} handleTitleChange={
          (e) => setTitleValue(e.target.value)
        }/>
        <QuestionEditListBlock {...questionData} setQuestionData={setQuestionData}/></>
        : <>
          <PreviewSurveyTitleBlock titleVal={titleValue} handleTitleChange={
          (e) => setTitleValue(e.target.value)
          }/>
            <PreviewQuestionListBlock {...questionData} setQuestionData={setQuestionData}/>
        </>
        }
        <div buttonWrapper>
        <button className="PreviewEditButton" onClick={() => {
          if(mode == "EDIT") {
            setMode("PREVIEW")
          } else {
            setMode("EDIT")
          }
        }}>{mode == "PREVIEW" ? "EDIT" : "PREVIEW"}</button>
        <button className="SaveButton" onClick={(e) => {
          if(isNewSurvey) {
            addSurveyDataInServer({SurveyTile: titleValue, questionData}, currentSurvey, setIsSurveySelected);
          }
          else {
            updateQuestionDataInServer({SurveyTile: titleValue, questionData}, currentSurvey, setIsSurveySelected);
          }
          }}>SAVE</button>
        <button className="DiscardButton" onClick={(e)=> {
          setIsSurveySelected(false);
        }}>DISCARD</button></div>
       </>}
    </div>
    </>
  );
}

export default SurveyBuilder;
