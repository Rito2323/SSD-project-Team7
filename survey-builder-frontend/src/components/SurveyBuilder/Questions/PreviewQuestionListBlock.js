import '../../../App.css';
import QuestionPreview from './QuestionPreview';

/**
 *Questions: [
  {
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
  }
]
*/

const getDefaultQuestion = ()=>{
 return {
    QuestionType: 3,  // Number: 1-Textbased, 2-Single, 3-Multi, 4-Matrix
    QuestionNo: 1, // Number
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

function PreviewQuestionListBlock(props) {
  var no_of_questions = props.Questions.length;
  var questions = [];
  console.log(props.Questions)
  for (var i = 0; i < no_of_questions; i++) {
    questions.push(<QuestionPreview key={i} {...props.Questions[i]}/>);
  }
  return (
    <div className="QuestionEditListBlock">
       {questions}
    </div>
  );
}

export default PreviewQuestionListBlock;