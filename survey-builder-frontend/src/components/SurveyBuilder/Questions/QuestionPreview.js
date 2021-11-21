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
  return (
    <div className="QuestionEdit">
      {question}
    </div>
  );
}

export default QuestionPreview;