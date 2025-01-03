import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import CreateQuiz from './components/CreateQuiz';
import ShowQuiz from './components/ShowQuiz';
import Dashboard from './components/Dashboard';

// #213547;
function App() {
  return (
    <>
        <HashRouter>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/registration' element={<Signup />} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default App
