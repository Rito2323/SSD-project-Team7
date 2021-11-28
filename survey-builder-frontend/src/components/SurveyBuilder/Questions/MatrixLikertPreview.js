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

function MultiLikertPreview(props) {
  var initialQuestionText = props["QuestionText"];
  var initialOptions = ["", "", ""];

  //   if(props["Options"] && props["Options"].length > 0) {
  //     initialOptions = [];
  //     for(var i = 0; i < props["Options"].length; i++) {
  //         initialOptions.push(props["Options"][i]["name"]);
  //     }
  //   }

  const rows = [];
  // const scales = [];
  const scalesRowData = [];
  if (props["Options"] && props["Options"].length > 0) {
    // scales = props["Options"][0]["levels"];
    scalesRowData.push(<td></td>);
    for (var i = 0; i < props["Options"][0]["levels"].length; i++) {
      scalesRowData.push(<td>{props["Options"][0]["levels"][i]}</td>);
    }
    for (var i = 0; i < props["Options"].length; i++) {
      const options = []
      console.log(props["Options"][i]["levels"])
      for (var j = 0; j < props["Options"][i]["levels"].length; j++) {
        options.push(<td>
          <input type="radio" id={i+"_"+j} name={props["Options"][i]["name"]} value={props["Options"][i]["levels"][j]} onChange={(e) => {
            if (props.onValueChange != undefined) {
              var ques = getQuestionFromProps(props);
              var optionIndex = e.target.id.split('_')[0];
              var key = getQuestionHeaderKey(ques,props["Options"][optionIndex]["name"]);
              props.onValueChange("Question"+ (props.QuestionNo), e.target.value);
            }
          }} />
        </td>)
      }
      rows.push(<tr>
        <td>
          <label name={"option" + i + 1}>{props["Options"][i]["name"]}</label>
        </td>
        {options}
      </tr>)
    }
  }
  return (
    <div className="MultiSelectPreview">
      {/* <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/> */}
      <p>{props.QuestionNo}. {initialQuestionText}</p>
      <br />
      <table>
        <tr>{scalesRowData}</tr>
        {rows}
      </table>
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
  return {
    QuestionType: props.QuestionType,
    QuestionNo: props.QuestionNo,
    QuestionText: props.QuestionText,
    Options: props.Options
  }
}

export default MultiLikertPreview;