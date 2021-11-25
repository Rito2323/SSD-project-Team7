import React, { useState } from 'react';
import ChangeableList from './QuestionUtilities/ChangeableList';
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

function SingleSelectEdit(props) {
  var initialQuestionText = "";
  var initialOptions = ["","",""];

  if(props["Options"] && props["Options"].length > 0) {
    initialOptions = [];
    for(var i = 0; i < props["Options"].length; i++) {
        initialOptions.push(props["Options"][i]["name"]);
    }
  }
  const [optionsState, setOptions] = useState(initialOptions);
  
  return (
    <div className="SingleSelectEdit">
        <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/>
        <textarea className="QuestionEditContentItem" value={initialQuestionText}/>
        <br/>
        <ChangeableList
            title="Options : "
            addButtonTitle="Add option"
            list={optionsState}
            updateList={(list)=>{
              setOptions([...list]);
            }}
        />
    </div>
  );
}

export default SingleSelectEdit;