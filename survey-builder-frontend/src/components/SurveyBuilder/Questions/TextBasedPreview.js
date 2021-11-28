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
    //TODO : check for error.
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
  var initialOptions = ["","",""];
  return (
    <div className="MultiSelectPreview">
        {/* <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/> */}
        <p>{props.QuestionNo}. {initialQuestionText}</p>
        <br/>
        <textarea onChange={(e)=>{
            if(props.onValueChange != undefined) {
                var ques = getQuestionFromProps(props);
                var key = getQuestionHeaderKey(ques);
                props.onValueChange(key, e.target.value);
            }
        }}></textarea>
        {/* <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            <FormControl aria-label="Text input with checkbox" />
        </InputGroup> */}
        {/* <ChangeableList
            title="Options : "
            addButtonTitle="Add option"
            list={optionsState}
            updateList={(list)=>{
              setOptions([...list]);
            }}
        /> */}
    </div>
  );
}

const getQuestionFromProps = (props) => {
    return  {
      QuestionType: props.QuestionType,
      QuestionNo: props.QuestionNo,
      QuestionText: props.QuestionText,
      Options: props.Options
    }
  }

export default TextBasedPreview;