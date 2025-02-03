import Home from './pages/Home'
import SignUp from './pages/Register'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<SignUp/>} />
      </Routes>
    </Router>
  )
}

export default App
