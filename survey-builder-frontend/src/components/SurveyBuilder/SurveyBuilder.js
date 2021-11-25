import '../../App.css';
import SurveyTitleBlock from './SurveyTitleBlock';
import PreviewSurveyTitleBlock from './PreviewSurveyTitleBlock';
import React, {useState, useEffect} from "react";
import QuestionEditListBlock from './Questions/QuestionEditListBlock';
import PreviewQuestionListBlock from './Questions/PreviewQuestionListBlock';
import SurveyTile from '../Utility/SurveyTile';


const getAllSurveys = async () => {
  var response = await fetch('http://localhost:3000/surveys')
  var surveys = await response.json();
  console.log("SURVEYS FETCHED : ");
  console.log(surveys);
  return surveys;
}

const getData = async () => {

  // var response = await fetch('http://localhost:3000/surveys')
  // var question = await response.json();

  // return {Questions: question["Questions"]}
  return {
    Questions: [
    {
      QuestionType: 4,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
      QuesionNo: 1, // Number
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
        QuesionNo: 2, // Number
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

const updateQuestionDataInServer = (questionData) => {
  // Send update request
  fetch('http://localhost:3000/update/survey/5', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SurveyNo : "5",
      SurveyTitle : "IIITH zoom call meetings",
      CreatedBy : "surveydeveloper2@iiit.ac.in",
      Questions : questionData["Questions"]
    })
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
  const [currentSurveyNo, setCurrentSurveyNo] = useState(0);

  const userName = "user1@students.iiit.ac.in";
  useEffect(() => {
  if (surveys.length == 0) {
      getDataFromBackEnd();
    }
  }, []);

  const getDataFromBackEnd = async () => {
    var surveyData = await getAllSurveys();
    setSurveys(surveyData);
    var data = await getData();
    console.log(data);
    setQuestionData(data);
  }

  const newSurveyNo = getNewSurveyNo(surveys);

  const surveyTiles = [];

  const createSurveyTile = <SurveyTile newSurveyNo={newSurveyNo}
  setIsSurveySelected={setIsSurveySelected}
  setQuestionData={setQuestionData}/>
  surveyTiles.push(<li>{createSurveyTile}</li>)

  for(var i = 0; i < surveys.length; i++) {
    const surveyTileComponent = <SurveyTile {...surveys[i]}
    setIsSurveySelected={setIsSurveySelected}
    setQuestionData={setQuestionData}/>;
    surveyTiles.push(<li>{surveyTileComponent}</li>)
  }

  console.log("Inside SurveyBuilder")
  console.log(questionData)
  // var questionData = ;
  return (
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
        <button className="SaveButton" onClick={(e) => {updateQuestionDataInServer(questionData)}}>SAVE</button>
        <button className="DiscardButton" onClick={(e)=> {
          setIsSurveySelected(false);
        }}>DISCARD</button>
       </>}
    </div>
  );
}

export default SurveyBuilder;
