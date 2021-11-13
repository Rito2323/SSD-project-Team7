import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import '../../../App.css';

/**
  QuestionType: 1,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
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
        <input type="checkbox" id="option1" name="option" value={option}/>
        <label for="option">{option}</label><br/>
       </>
    })
  const [optionsState, setOptions] = useState(initialOptions);
  return (
    <div className="MultiSelectPreview">
        <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/>
        <p>{initialQuestionText}</p>
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

export default MultiSelectPreview;