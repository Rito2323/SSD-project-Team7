import '../../../App.css';
import MultiSelectEdit from './MultiSelectEdit';
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

const getDefaultQuestion = ()=>{
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
  console.log(props.Questions)
  for (var i = 0; i < no_of_questions; i++) {
    questions.push(<>
    <QuestionEdit key={i} {...props.Questions[i]}/>
    <button id={"add_"+i} key={i} className="add-button" onClick={(e)=>{
      const questions_updated = props.Questions;
      const default_question = getDefaultQuestion()
      questions_updated.splice(parseInt(e.target.id.substring(4), 10)+1, 0, default_question);
      props.setQuestionData({Questions:questions_updated});
    }}></button>
    </>
    );
  }
  return (
    <div className="QuestionEditListBlock">
       {questions}
    </div>
  );
}

export default QuestionEditListBlock;