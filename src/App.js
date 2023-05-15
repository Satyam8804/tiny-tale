import {BrowserRouter as Router , Routes , Route, Link} from 'react-router-dom'
import './App.css';
import Data from './Data/Data.js';

function App() {
  return (
    <div className="App">
      
      <Router>
      
        <Routes>
          <Route index element={<Link to="/data">
            <button className='loading'>Load data</button>
           </Link>}></Route>
          <Route path='/data' element={<Data/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
