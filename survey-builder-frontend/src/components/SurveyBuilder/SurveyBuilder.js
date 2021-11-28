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
  // var surveysForUser = surveys.filter((survey) => survey.CreatedBy == userEmail);
  // console.log("SURVEYS FETCHED For User : ");
  // console.log(surveys);
  return surveys;
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

const addSurveyDataInServer = (data, oldSurvey, setIsSurveySelected) => {
  // Send update request
  const uri = backendUri + "add_survey";
  console.log("oldSurvey");  
  console.log(oldSurvey);  
  console.log("data");  
  console.log(data);
  const newSurveyBody = {
    ...oldSurvey,
    SurveyNo: oldSurvey.SurveyNo,
    SurveyTitle: data.SurveyTitle,
    Questions : data.QuestionData["Questions"]
  }
  console.log("NEW QUESTION");
  console.log(newSurveyBody);
  fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...newSurveyBody})
  }).then((res)=>{
    if(res.status == 200) {
      alert("New Survey Saved Successfully!\n Survey url : " + frontendUri + "survey/" + oldSurvey["SurveyNo"]);
      setIsSurveySelected(false);
    } else {
      alert("There was some problem while saving the survey! Please make sure all the details are filled.");      
    }

}).catch(()=>{alert("There was some problem while saving the survey! Please make sure all the details are filled.");})
}

const updateQuestionDataInServer = (data, oldSurvey, setIsSurveySelected) => {
  // Send update request
  console.log("Inside updateQuestionDataInServer")
  const uri = backendUri + "update/survey/" + oldSurvey.SurveyNo;
  const newSurveyBody = {
    ...oldSurvey,
    SurveyNo: oldSurvey.SurveyNo,
    SurveyTitle: data.SurveyTitle,
    Questions : data.QuestionData["Questions"]
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
    // Calculating new survey no.
    console.log("Calculating new survey no.");
    console.log(surveys);
    var max = 0;
    for(var i = 0; i < surveys.length; i++) {
      if(surveys[i].SurveyNo > max) {
        max = surveys[i].SurveyNo;
      }
    }
    return (max + 1);
}

function SurveyBuilder(props) {
  const [titleValue, setTitleValue] = useState(props.SurveyTitle);
  const [questionData, setQuestionData] = useState({Questions: []});
  const [surveys, setSurveys] = useState([]);
  const [mode, setMode] = useState("EDIT");
  const [isSurveySelected, setIsSurveySelected] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({});
  const [isNewSurvey, setIsNewSurvey] = useState(false);
  const [rerender_key, setReRenderKey] = useState(1);

  const userName = localStorage.getItem("currentUser"); // NEED to get this from login

  useEffect(() => {
    if (surveys.length == 0) {
        getDataFromBackEnd();
      }
    }, []);

  useEffect(() => {
    // if (surveys.length == 0) {
     getDataFromBackEnd();
    // }
  }, [surveys, isSurveySelected]);

  const getDataFromBackEnd = async () => {
    var surveyData = await getAllSurveys(userName);
    setSurveys(surveyData);
  }

  const newSurveyNo = getNewSurveyNo(surveys);

  const surveyTiles = [];

  const rerender = () => {
    setReRenderKey(rerender_key + 1);
  }

  const createSurveyTile = <SurveyTile newSurveyNo={newSurveyNo}
  setIsSurveySelected={setIsSurveySelected}
  setQuestionData={setQuestionData}
  setTitle={setTitleValue}
  setCurrentSurvey={setCurrentSurvey}
  setIsNewSurvey={setIsNewSurvey}
  currentUser={userName}
  rerender={rerender}/>
  surveyTiles.push(<li>{createSurveyTile}</li>)

  const filteredSurveys = surveys.filter((survey) => survey.CreatedBy == userName);

  for(var i = 0; i < filteredSurveys.length; i++) {
    const surveyTileComponent = <SurveyTile survey={{...filteredSurveys[i]}}
    setIsSurveySelected={setIsSurveySelected}
    setQuestionData={setQuestionData}
    setTitle={setTitleValue}
    setCurrentSurvey={setCurrentSurvey}
    setIsNewSurvey={setIsNewSurvey}
    currentUser={userName}
    rerender={rerender}/>;
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
    <div key={rerender_key} className="App SurveyBuilder">
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
            addSurveyDataInServer({SurveyTitle: titleValue, QuestionData: questionData}, currentSurvey, setIsSurveySelected);
            rerender();
          }
          else {
            updateQuestionDataInServer({SurveyTitle: titleValue, QuestionData: questionData}, currentSurvey, setIsSurveySelected);
            rerender();
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
