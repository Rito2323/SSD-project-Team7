import iiitlogo from '../iiithlogonegative.png'
import backimage from '../IIITsunset.jpg'

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
					<button>Survey Builder</button>
					<button>Transcript Generator</button>
					<button>View Responses</button>
				</div>
			</div>
		</header>
  );
}

export default DashBoard;