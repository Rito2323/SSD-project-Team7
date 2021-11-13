import '../../App.css';

function PreviewSurveyTitleBlock(props) {
  const titleVal = props.titleVal;
  return (
    <div className="SurveyTitleBlock">
        <input value={titleVal}/>
    </div>
  );
}

export default PreviewSurveyTitleBlock;
