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
              <Route path='/' element={<Signup />} />
              <Route path='/create/:userId' element={<Dashboard />} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default App
