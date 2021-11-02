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

function QuestionEditListBlock(props) {
  console.log(props);
  var no_of_questions = props.Questions.length;
  var questions = [];
  for (var i = 0; i < no_of_questions; i++) {
    questions.push(<QuestionEdit key={i} {...props.Questions[i]}/>);
  }
  return (
    <div className="QuestionEditListBlock">
       {questions}
    </div>
  );
}

export default QuestionEditListBlock;