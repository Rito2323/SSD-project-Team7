import '../../App.css';

function SurveyTitleBlock(props) {
  const titleVal = props.titleVal;
  return (
    <div className="SurveyTitleBlock" tabIndex = "-1">
        <input value={titleVal}
               onChange={props.handleTitleChange} />
    </div>
  );
}

export default SurveyTitleBlock;
