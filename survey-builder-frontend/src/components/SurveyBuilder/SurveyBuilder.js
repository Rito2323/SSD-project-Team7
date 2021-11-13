import '../../App.css';
import SurveyTitleBlock from './SurveyTitleBlock';
import PreviewSurveyTitleBlock from './PreviewSurveyTitleBlock';
import React, {useState} from "react";
import QuestionEditListBlock from './Questions/QuestionEditListBlock';
import PreviewQuestionListBlock from './Questions/PreviewQuestionListBlock';


const getData = () => {
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

const updateData = () => {
  // Send update request 
}

function SurveyBuilder(props) {
  const [value, setValue] = useState("Untitled Form");
  const [questionData, setQuestionData] = useState(getData());
  const [mode, setMode] = useState("EDIT");

  // var questionData = ;
  return (
    <div className="App SurveyBuilder">
       {mode == "EDIT" ? <>
        <SurveyTitleBlock titleVal={value} handleTitleChange={
          (e) => setValue(e.target.value)
        }/>
        <QuestionEditListBlock {...questionData} setQuestionData={setQuestionData}/> </>
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
        <button className="SaveButton" onClick={() => {updateData()}}>SAVE</button>
        <button className="DiscardButton">DISCARD</button>
    </div>
  );
}

export default SurveyBuilder;
