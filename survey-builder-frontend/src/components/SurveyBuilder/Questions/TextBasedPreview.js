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
        <input type="text" onChange={()=>{

        }}></input>
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

export default TextBasedPreview;