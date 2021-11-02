import React, { useState } from 'react';
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

function MultiSelectEdit(props) {
  return (
    <div className="MultiSelectEdit">
        <p>Multi Select</p>
        <label class="leftmargin">Question Text:</label>
        <input></input>
        <br/>
        <textarea/>
    </div>
  );
}

export default MultiSelectEdit;