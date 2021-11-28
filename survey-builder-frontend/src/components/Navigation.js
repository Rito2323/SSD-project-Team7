import '../App.css';
import {Link} from 'react-router-dom'

function Navigation(props) {
  return (
    <div className="Navigation">
      <ul>    
          <li><Link to='/buildsurvey'>
					  <button>Survey Builder</button>
					</Link></li>
          <li><Link to='/transcript'>
					  <button>Transcript Generator</button>
					</Link></li>  
          <li><Link to='/responses'>
					  <button>Responses</button>
					</Link></li>
          <li><Link to='/login'>
					  <button>Login Again</button>
          </Link></li> 
        </ul>
    </div>
  );
}

export default Navigation;