import React, {useState} from 'react'
import App from '../../App';
import 'response.css';



function Surveyno(props){
    const [Surveyno, setSurveyNo] = useState("");
    const submitForm = (e)=> {
        e.preventDefault();
        const newSur = {surveyNo:Surveyno};
        console.log(newSur)
    }

    return( 
        <form className="survey" action="" onSubmit={submitForm}>
            <div>
                <label className="email" hrtmlFor="email">Select the survey number</label><br></br>
                
                <input type="checkbox" id="s1" name="S1" value="1" onClick={(e)=>setSurveyNo(e.target.value)}/>
                <label > Survey 1</label><br/>
                <input type="checkbox" id="s2" name="S2" value="2" onClick={(e)=>setSurveyNo(e.target.value)}/>
                <label> Survey 2</label><br/>
                <input type="checkbox" id="s3" name="S3" value="3" onClick={(e)=>setSurveyNo(e.target.value)}/>
                <label> Survey 3</label><br/><br/>

           </div>
            <div className="btn">
            <button type="submit">Show</button>
            </div>
        </form>
    );
}
export default Surveyno;