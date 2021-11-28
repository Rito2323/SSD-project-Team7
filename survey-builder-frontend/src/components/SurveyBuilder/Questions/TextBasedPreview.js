import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
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

const getQuestionHeaderKey = (question, optionName = undefined) => {
  let quesStr = "";
  if (optionName == undefined) {
    quesStr = question["QuestionText"];
  } else {
    quesStr = question["QuestionText"] + "-" + optionName;
  }
  return quesStr;
}

function TextBasedPreview(props) {
  var initialQuestionText = props["QuestionText"];
  var initialOptions = ["", "", ""];
  return (
    <div className="MultiSelectPreview">
      {/* <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/> */}
      <p>{props.QuestionNo}. {initialQuestionText}</p>
      <br />
      {props.isDisabled && props.answer ?
        <textarea value={props.answer} contentEditable={false}></textarea>
        :
        <textarea onChange={(e) => {
          if (props.onValueChange != undefined) {
            var ques = getQuestionFromProps(props);
            var key = getQuestionHeaderKey(ques);
            props.onValueChange("Question" + (props.QuestionNo), e.target.value);
          }
        }}></textarea>
      }

    </div>
  );
}

const getQuestionFromProps = (props) => {
  return {
    QuestionType: props.QuestionType,
    QuestionNo: props.QuestionNo,
    QuestionText: props.QuestionText,
    Options: props.Options
  }
}

export default TextBasedPreview;