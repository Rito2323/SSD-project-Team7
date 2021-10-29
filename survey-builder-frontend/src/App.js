import './App.css';
import SurveyBuilder from './components/SurveyBuilder/SurveyBuilder';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <table>
        <tr>
          <td>
            <Navigation />
          </td>
        </tr>
        <tr>
          <td>
            <SurveyBuilder />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
