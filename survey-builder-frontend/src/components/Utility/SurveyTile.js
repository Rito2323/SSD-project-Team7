import '../../App.css';


// Question: {
//     QuestionType: 1,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
//     QuesionNo: 1, // Number
//     QuestionText: "", //string
//     Options: [ // list of Option
//         {
//           name: "option1",
//           levels: ["low", "mid", "high"]
//         },
//         {
//           name: "option2",
//           levels: ["low", "mid", "high"]
//         }
//       ]
//   }

// {
//     SurveyNo: 1, // Number
//     SurveyTitle: "", // string
//     CreatedBy: "", // string
//     CreationDate: "",
//     Questions : []  // list of question
//    }

const getNewSurvey= (newSurveyNo) =>{
    return ({
            SurveyNo: newSurveyNo, // Number
            SurveyTitle: "", // string
            CreatedBy: "", // string
            CreationDate: "",
            Questions : []  // list of question
           })
}

function SurveyTile(props) {
    var survey = props;
    if(props.newSurveyNo != undefined) {
        survey = getNewSurvey(props.newSurveyNo)
    }

    return (<button className="survey-tile" onClick={(e)=>{
        props.setIsSurveySelected(true);
        props.setQuestionData({Questions: survey.Questions});
        props.setCurrentSurveyNo(survey.SurveyNo);
    }}>
        <table>
            <tr>
                <td rowSpan={2}>
                    {props.newSurveyNo != undefined ?
                        <img className="survey-title-image" src="add.png"/>
                        :
                        <img className="survey-title-image" src="survey_icon.png"/>
                    }
                </td>
            </tr>
            <tr></tr>
            <tr>
                <td>
                    <label>{survey.SurveyTitle}</label>
                </td>
            </tr>
        </table>

    </button>)
}

export default SurveyTile;