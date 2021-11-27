import iiitlogo from '../iiithlogonegative.png'
import backimage from '../IIITsunset.jpg'
import {Link} from 'react-router-dom'

function DashBoard() {
  return (
    <header class="header" id="homeid">
			<div class="img-wrapper">
				<img src={backimage} alt='background'/>
			</div>
			<div class="banner">
       			<img src={iiitlogo} alt='logo'/>
				<h1>International Institute of Information Technology</h1>
				<p>Hyderabad, India.</p>
				<div class="dashButtons">
					<Link to='/buildsurvey'>
					<button>Survey Builder</button>
					</Link>
					<Link to='/transcript'>
					<button>Transcript Generator</button>
					</Link>
					<Link to='/responses'>
					<button>View Responses</button>
					</Link>
				</div>
			</div>
		</header>
  );
}

export default DashBoard;