import '../../App.css';
import plus from './green-plus-sign.png'
import {Link} from 'react-router-dom'

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

const backendUri = "http://localhost:3000/";
const frontendUri = "http://localhost:3001/";

const delete_survey = (surveyNo, rerender) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
        // Delete it!
        const uri = backendUri + "delete/survey/" + surveyNo;
        fetch(uri, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            alert("Survey was deleted successfully!");
            rerender();
        }).catch(() => { alert("There was some problem while deleting the survey") })
    } else {
        // Do nothing!
    }
}

const copy_survey_link = (surveyNo, rerender) => {
const survey_link = frontendUri + "survey/" + surveyNo
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(survey_link);

  /* Alert the copied text */
  alert("Survey link is copied to clipboard!");
}

const getNewSurvey = (newSurveyNo, user) => {
    let date = new Date()
    return ({
        SurveyNo: newSurveyNo, // Number
        SurveyTitle: "Untitled Form", // string
        CreatedBy: user, // string
        CreationDate: date, // date
        Questions: []  // list of question
    })
}

function SurveyTile(props) {
    var survey = props.survey;
    var isNewSurvey = false;
    if (props.newSurveyNo != undefined) {
        survey = getNewSurvey(props.newSurveyNo, props.currentUser)
        isNewSurvey = true;
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <button className={props.newSurveyNo != undefined ? "survey-tile-add" : "survey-tile"} onClick={(e) => {
                            props.setTitle(survey.SurveyTitle);
                            props.setIsSurveySelected(true);
                            props.setQuestionData({ Questions: survey.Questions });
                            props.setCurrentSurvey(survey);
                            props.setIsNewSurvey(isNewSurvey);
                        }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td rowSpan={2}>
                                            {props.newSurveyNo != undefined ?
                                                <img className="survey-title-image" src={plus}/>
                                                :
                                                <img className="survey-title-image" src="survey_icon.png" />
                                            }
                                        </td>
                                    </tr>
                                    <tr></tr>
                                    <tr>
                                        <td>
                                            <label  className="surveyTitleInTile">{survey.SurveyTitle}</label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>
                    </td>
                    {props.newSurveyNo == undefined ?
                        <td className="delete-survey-button-cell">
                            <div className={"vertical-div"}>
                            <button title="Delete Survey" className="delete-survey-button" onClick={(e) => {
                                delete_survey(survey.SurveyNo, props.rerender);
                            }}>X</button>
                            <button title="Copy Survey Link" className="delete-survey-button" onClick={(e) => {
                                copy_survey_link(survey.SurveyNo, props.rerender);
                            }}><img className={"link-icon"} src="https://img.icons8.com/ios/50/000000/link--v2.png"/></button>
                            </div>
                        </td> : <></>}
                </tr>
            </tbody>
        </table>)
}

export default SurveyTile;