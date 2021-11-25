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

function SingleSelectPreview(props) {
    var initialQuestionText = props["QuestionText"];
    var initialOptions = ["", "", ""];

    if (props["Options"] && props["Options"].length > 0) {
        initialOptions = [];
        for (var i = 0; i < props["Options"].length; i++) {
            initialOptions.push(props["Options"][i]["name"]);
        }
    }

//     var listener;
//     useEffect(() => {
//         // on ount
//         var rad = document.myForm.myRadios;
//         var prev = null;
//         for (var i = 0; i < rad.length; i++) {
//             rad[i].addEventListener('change', function () {
//                 (prev) ? console.log(prev.value) : null;
//                 if (this !== prev) {
//                     prev = this;
//                 }
//                 console.log(this.value)
//             });}
//         }, []);
// }

const optionsElements = initialOptions.map((option) => {
    return <>
        <input className="questionCheckBox" type="radio" id="option1" name="option" value={option} onChange={(e) => {
            if (props.onValueChange != undefined) {
                var ques = getQuestionFromProps(props);
                var key = getQuestionHeaderKey(ques);
                props.onValueChange(key, e.target.value);
            }
        }} />
        <label className="questionOptionLabel" for="option">{option}</label><br />
    </>
})
const [optionsState, setOptions] = useState(initialOptions);
return (
    <div className="MultiSelectPreview">
        {/* <br/>
        <label className="QuestionEditContentItem">Question Text:</label>
        <br/> */}
        <p>{props.QuestionNo}. {initialQuestionText}</p>
        <br />
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

const getQuestionHeaderKey = (question, optionName = undefined) => {
    //TODO : check for error.
    // const question = questions[questionNo - 1];
    let quesStr = "";
    if (optionName == undefined) {
        quesStr = question["QuestionText"];
    } else {
        quesStr = question["QuestionText"] + "-" + optionName;
    }
    return quesStr;
}

const getQuestionFromProps = (props) => {
    return  {
      QuestionType: props.QuestionType,
      QuestionNo: props.QuestionNo,
      QuestionText: props.QuestionText,
      Options: props.Options
    }
  }

export default SingleSelectPreview;