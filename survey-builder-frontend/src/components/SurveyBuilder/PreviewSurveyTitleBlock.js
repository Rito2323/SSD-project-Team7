import '../../App.css';

function PreviewSurveyTitleBlock(props) {
  const titleVal = props.titleVal;
  return (
    <div className="SurveyTitleBlock">
        <input contentEditable={false} value={titleVal}/>
    </div>
  );
}

export default PreviewSurveyTitleBlock;
