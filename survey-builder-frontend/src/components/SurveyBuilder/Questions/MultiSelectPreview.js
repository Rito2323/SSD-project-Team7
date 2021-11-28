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

function MultiSelectPreview(props) {
  var initialQuestionText = props["QuestionText"];
  var initialOptions = ["","",""];

  if(props["Options"] && props["Options"].length > 0) {
    initialOptions = [];
    for(var i = 0; i < props["Options"].length; i++) {
        initialOptions.push(props["Options"][i]["name"]);
    }
  }
  const optionsElements = initialOptions.map((option)=>{
    return <>
        <input className="questionCheckBox" type="checkbox" name={props.QuestionText} value={option} onClick={(e)=>{
          if (props.onValueChange != undefined) {
              var ques = getQuestionFromProps(props);
              var key = getQuestionHeaderKey(ques);
              var checkBoxes = document.getElementsByName(props.QuestionText);
              var j=0;
              var ans = "";
              for (var k = 0; k<checkBoxes.length; k++) {
                if(checkBoxes[k].checked) {
                  if(j!=0) {
                    ans = ans + ",";
                  }
                  ans = ans + checkBoxes[k].value;
                  j = j + 1;
                }
              }
              // console.log(e.target.value);
              // console.log(e.target.checked);
              props.onValueChange("Question"+(props.QuestionNo), ans);
          }
        }}/>
        <label className="questionOptionLabel" for={props.QuestionText}>{option}</label><br/>
       </>
    })
  const [optionsState, setOptions] = useState(initialOptions);
  return (
    <div className="MultiSelectPreview">
        {/* <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/> */}
        <p>{props.QuestionNo}. {initialQuestionText}</p>
        <br/>
        {optionsElements}
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

export default MultiSelectPreview;