
import './App.css';
import { Routes,Route } from "react-router-dom";
import WelcomeScreen from './pages/welcome';
import SurveyApp from './pages/surveyApp';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route  path='/' element={<WelcomeScreen/>}/>
      <Route path='/surveyApp' element={<SurveyApp/>}/>
     </Routes>
    </div>
  );
}

export default App;
