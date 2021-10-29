import '../../../App.css';

function MatrixLikertEdit(props) {
  const titleVal = props.titleVal;
  return (
    <div className="MatrixLikert">
        <label>Question Text:</label>
        <input></input>
        <br/>
        <label>Scale for each opiton:</label>
        <div>
            <table>
                <tr>
                    <button id="add-scale-button">Add scale</button>
                </tr>
                <tr>
                    <input></input> 
                    <button id="add-scale-button">UP</button>
                    <button id="add-scale-button">DOWN</button>
                    <button id="add-scale-button">Delete</button>
                </tr>
                <tr>
                    <input></input> 
                    <button id="add-scale-button">UP</button>
                    <button id="add-scale-button">DOWN</button>
                    <button id="add-scale-button">Delete</button>              
                </tr>
            </table>
        </div>
    </div>
  );
}

export default MatrixLikertEdit;