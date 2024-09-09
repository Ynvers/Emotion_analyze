import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Analyse from './pages/Analyse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/analyse' element={<Analyse />}></Route>
      </Routes>
    </Router>
  )
}

export default App
