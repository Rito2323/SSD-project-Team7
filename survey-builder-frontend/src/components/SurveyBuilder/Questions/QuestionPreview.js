import '../../../App.css';
import TextBasedEdit from './TextBasedEdit';
import SingleSelectEdit from './SingleSelectEdit';
import MultiSelectPreview from './MultiSelectPreview';
import MatrixLikertEdit from './MatrixLikertEdit';
import React, { useState } from 'react';
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

function QuestionPreview(props) {
  let question;
  const [qType, setQType] = useState(props.QuestionType);

  if (qType == 1) {
    question = <TextBasedEdit {...props} />;
  } else if (qType == 2) {
    question = <SingleSelectEdit {...props} />;
  } else if (qType == 3) {
    question = <MultiSelectPreview {...props} />;
  } else if (qType == 4) {
    question = <MatrixLikertEdit {...props} />;
  }
  var options = ["TextBased", "SingleSelect", "MultiSelect", "MatrixLikert"];
  return (
    <div className="QuestionEdit">
      {/* <div className="QuestionTypeBox">
      <br/>
      <label for="qTypeLabel" className="topmargin">Question Type:</label>
      <br/>
      <select name="qType" id="qTypeSelect" value={options[qType - 1]} onChange={(e) => {
        setQType(e.target.selectedIndex + 1);
        document.getElementById("qTypeSelect").value = options[e.target.selectedIndex];
      }}>
        <option value={options[0]}>Text Based</option>
        <option value={options[1]}>Single Select</option>
        <option value={options[2]}>Multi Select</option>
        <option value={options[3]}>Matrix Likert</option>
      </select>
      <Form.Select aria-label="Default select example" name="qType" id="qTypeSelect"  value={options[qType - 1]} onChange={(e) => {
        setQType(e.target.selectedIndex + 1);
        document.getElementById("qTypeSelect").value = options[e.target.selectedIndex];
      }}>
        <option value={options[0]}>Text Based</option>
        <option value={options[1]}>Single Select</option>
        <option value={options[2]}>Multi Select</option>
        <option value={options[3]}>Matrix Likert</option>
    </Form.Select>
      </div> */}
      {question}
    </div>
  );
}

export default QuestionPreview;