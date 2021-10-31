import '../../App.css';

function SurveyTitleBlock(props) {
  const titleVal = props.titleVal;
  return (
    <div className="SurveyTitleBlock">
        <input value={titleVal}
               onChange={props.handleTitleChange} />
    </div>
  );
}

export default SurveyTitleBlock;
