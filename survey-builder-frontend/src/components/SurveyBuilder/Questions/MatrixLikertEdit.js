import React, { useState } from 'react';
import '../../../App.css';
import ChangableList from './QuestionUtilities/ChangableList';

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
  const [scalesState, setScales] = useState(["","",""]);
  const [optionsState, setOptions] = useState(["","",""]);

  return (
    <div className="MatrixLikert">
        <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/>
        <textarea className="QuestionEditContentItem"/>
        <br/>
        <ChangableList
            title="Scale for each option : "
            addButtonTitle="Add Scale"
            list={scalesState}
            updateList={(list)=>{
                setScales([...list]);
            }}
        />
        <ChangableList
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