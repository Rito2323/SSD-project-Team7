import '../../App.css';
import SurveyTitleBlock from './SurveyTitleBlock';
import React, {useState} from "react";
import MatrixLikertEdit from './Questions/MatrixLikertEdit';

function SurveyBuilder(props) {
  const [value, setValue] = useState("Untitled Form");

  return (
    <div className="App SurveyBuilder">
        <SurveyTitleBlock titleVal={value} handleTitleChange={
          (e) => setValue(e.target.value)
        }/>
        <MatrixLikertEdit/>
    </div>
  );
}

export default SurveyBuilder;
