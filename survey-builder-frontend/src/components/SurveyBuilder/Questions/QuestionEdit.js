import '../../../App.css';
import TextBasedEdit from './TextBasedEdit';
import SingleSelectEdit from './SingleSelectEdit';
import MultiSelectEdit from './MultiSelectEdit';
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

/**
 * 
 * @param {*} props :
 * {
 *  QuestionType: 3,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
    QuesionNo: 1, // Number
    QuestionText: "", //string
    Options: [ // list of Option
      {
        name: "option1",
        levels: []
      },
      {
        name: "option2",
        levels: []
      }
    ],
    updateQuestion: (question, index) => {}
    deleteQuestion: (questionIndex) => {}
 * }
 * @returns 
 */

function QuestionEdit(props) {
  let question;
  const qType = props.QuestionType;

  if (qType == 1) {
    question = <TextBasedEdit {...props} />;
  } else if (qType == 2) {
    question = <SingleSelectEdit {...props} />;
  } else if (qType == 3) {
    question = <MultiSelectEdit {...props} />;
  } else if (qType == 4) {
    question = <MatrixLikertEdit {...props} />;
  }
  var options = ["TextBased", "SingleSelect", "MultiSelect", "MatrixLikert"];
  return (
    <div className="QuestionEdit" tabIndex = "-1">
      <div className="QuestionTypeBox">
        <br />
        <p>{props.QuesionNo}<button onClick={(e)=>{
            {props.deleteQuestion(props.QuesionNo-1)}         
        }} className="close-button"><img src="./remove.svg"/></button></p><label for="qTypeLabel" className="topmargin">Question Type:</label>
        <br />
        <Form.Select aria-label="Default select example" name="qType" id="qTypeSelect" value={options[qType - 1]} onChange={(e) => {
          const newQues = {
            QuestionType: (e.target.selectedIndex + 1),
            QuesionNo: props.QuesionNo,
            QuestionText: props.QuestionText,
            Options: props.Options
          }
          props.updateQuestion(newQues, props.QuesionNo - 1);
        }}>
          <option value={options[0]}>Text Based</option>
          <option value={options[1]}>Single Select</option>
          <option value={options[2]}>Multi Select</option>
          <option value={options[3]}>Matrix Likert</option>
        </Form.Select>
      </div>
      {question}
    </div>
  );
}

export default QuestionEdit;