import '../../App.css';


// Question: {
//     QuestionType: 1,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
//     QuestionNo: 1, // Number
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

const getNewSurvey= (newSurveyNo, user) =>{
    let date = new Date()
    // let day = date.getDate();
    // let month = date.getMonth()+1;
    // let year = date.getFullYear();
    
    // let fullDate = `${day}.${month}.${year}.`;
    return ({
            SurveyNo: newSurveyNo, // Number
            SurveyTitle: "Untitled Form", // string
            CreatedBy: user, // string
            CreationDate: date,
            Questions : []  // list of question
           })
}

function SurveyTile(props) {
    var survey = props.survey;
    var isNewSurvey = false;
    if(props.newSurveyNo != undefined) {
        survey = getNewSurvey(props.newSurveyNo, props.currentUser)
        isNewSurvey = true;
    }

    return (<button className="survey-tile" onClick={(e)=>{
        props.setIsSurveySelected(true);
        props.setQuestionData({Questions: survey.Questions});
        props.setCurrentSurvey(survey);
        props.setIsNewSurvey(isNewSurvey);
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