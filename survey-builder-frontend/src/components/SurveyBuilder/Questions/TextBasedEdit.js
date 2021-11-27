import React, { useState } from 'react';
import '../../../App.css';

/**
  QuestionType: 1,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
  QuestionNo: 1, // Number
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
*/

function TextBasedEdit(props) {
  return (
    <div className="TextBasedEdit">
      <div class="innerCard">
          <div class="Question-heading">Question:</div>
          <div class="Question-text"><textarea id="textQuestion" value={props.QuestionText} onChange={(e)=>{
          var question = getQuestionFromProps(props);
          question.QuestionText = e.target.value;
          props.updateQuestion(question, props.QuestionNo - 1);
        }}></textarea></div>
      </div>
    </div>
  );
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

const getQuestionFromProps = (props) => {
  return  {
    QuestionType: props.QuestionType,
    QuestionNo: props.QuestionNo,
    QuestionText: props.QuestionText,
    Options: props.Options
  }
}

export default TextBasedEdit;