import React, { useState } from 'react';
import '../../../App.css';
import ChangeableList from './QuestionUtilities/ChangeableList';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

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

function MatrixLikertEdit(props) {
  var initialQuestionText = "";
  var initialScales = ["","",""];
  var initialOptions = ["","",""];

  if(props["Options"] && props["Options"].length > 0) {
    initialScales = [];
    for(var i = 0; i < props["Options"][0]["levels"].length; i++) {
      initialScales.push(props["Options"][0]["levels"][i]);//checking needed
    }

    initialOptions = [];
    for(var i = 0; i < props["Options"].length; i++) {
        initialOptions.push(props["Options"][i]["name"]);
    }
  }

  if(props["QuestionText"]) {
    initialQuestionText = props["QuestionText"];
  }

  const [scalesState, setScales] = useState(initialScales);
  const [optionsState, setOptions] = useState(initialOptions);

  return (
    <div className="MatrixLikert">
        <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/>
        {/* <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        /> */}
        {/* <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        /> */}
        <textarea className="QuestionEditContentItem" value={initialQuestionText}/>
        <br/>
        <ChangeableList
            title="Scale for each option : "
            addButtonTitle="Add Scale"
            list={scalesState}
            updateList={(list)=>{
                setScales([...list]);

            }}
        />
        <ChangeableList
            title="Options : "
            addButtonTitle="Add Option"
            list={optionsState}
            updateList={(list)=>{
                setOptions([...list]);
            }}
        />
    </div>
  );
}

export default MatrixLikertEdit;