import '../../App.css';
import SurveyTitleBlock from './SurveyTitleBlock';
import React, {useState} from "react";
import QuestionEditListBlock from './Questions/QuestionEditListBlock';

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
        QuesionNo: 1, // Number
        QuestionText: "", //string
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

function SurveyBuilder(props) {
  const [value, setValue] = useState("Untitled Form");
  var questionData = getData();
  return (
    <div className="App SurveyBuilder">
        <SurveyTitleBlock titleVal={value} handleTitleChange={
          (e) => setValue(e.target.value)
        }/>
        <QuestionEditListBlock {...questionData}/>
        <button className="SaveButton">SAVE</button>
        <button className="DiscardButton">DISCARD</button>
    </div>
  );
}

export default SurveyBuilder;
