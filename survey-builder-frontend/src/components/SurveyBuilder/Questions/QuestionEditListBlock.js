import '../../../App.css';
import QuestionEdit from './QuestionEdit';

/**
 *Questions: [
  {
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
  }
]
*/

const getDefaultQuestion = () => {
  return {
    QuestionType: 3,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
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
    ]
  }
}

function QuestionEditListBlock(props) {
  var no_of_questions = props.Questions.length;
  var questions = [];
  console.log(no_of_questions)
  for (var i = 0; i < no_of_questions; i++) {
    const question_data = props.Questions[i];
    question_data.QuesionNo = i + 1;
    console.log(question_data.QuesionNo)
    questions.push(<>
      <QuestionEdit
        key={i}
        {...question_data}
        updateQuestion={(question, index) => {
          const questions_data = props.Questions;
          questions_data[index] = question;
          console.log(questions_data);
          props.setQuestionData({ Questions: questions_data });
        }}
        deleteQuestion={(questionIndex) => {
          var questions_data_list = props.Questions;
          questions_data_list = questions_data_list.filter((question) => question.QuesionNo != questionIndex + 1);
          for (var j = questionIndex; j < questions_data_list.length; j++) {
            questions_data_list[j].QuesionNo -= 1;
          }
          props.setQuestionData({ Questions: questions_data_list });
        }} />
      <button id={"add_" + i} key={i} className="add-button" onClick={(e) => {
        const questions_updated = props.Questions;
        const default_question = getDefaultQuestion()
        default_question.QuesionNo = parseInt(e.target.id.split('_')[1], 10) + 2;
        questions_updated.splice(parseInt(e.target.id.split('_')[1], 10) + 1, 0, default_question);
        for (var j = default_question.QuesionNo; j < questions_updated.length; j++) {
          questions_updated[j].QuesionNo += 1;
        }
        props.setQuestionData({ Questions: questions_updated });
      }}></button>
    </>
    );
  }
  return (
    <div className="QuestionEditListBlock" tabIndex = "-1">
      {questions.length > 0 ? questions :
        <button id={"add_" + 0} key={0} className="add-button" onClick={(e) => {
          const questions_updated = props.Questions;
          const default_question = getDefaultQuestion()
          default_question.QuesionNo = parseInt(e.target.id.split('_')[1], 10) + 2;
          questions_updated.splice(parseInt(e.target.id.split('_')[1], 10) + 1, 0, default_question);
          for (var j = default_question.QuesionNo; j < questions_updated.length; j++) {
            questions_updated[j].QuesionNo += 1;
          }
          props.setQuestionData({ Questions: questions_updated });
        }}></button>
      }
    </div >
  );
}

export default QuestionEditListBlock;