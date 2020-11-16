import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import PieChart from './components/PieChart';
import CountryDetaille from './components/CountryDetaille';

function App() {
  return (
    <Router>
      <Route exact path='/' component={PieChart} />
      <Route exact path='/:country/detailles' component={CountryDetaille} />
      
    </Router>
  );
}

export default App;
