import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';

// #213547;
function App() {
  return (
    <>
        <HashRouter>
            <Routes>
              <Route path='/' element={<Signup />} />
              <Route path='/create/:userId' element={<Dashboard />} />
              <Route path='/create/quiz/:quizId/:userId' element={<Quiz />} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default App
