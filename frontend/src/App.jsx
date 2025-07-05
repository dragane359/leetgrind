import './App.css'
import { AboutPage } from './pages/AboutPage'
import { CreateCardPage } from './pages/CreateCardPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { Navbar } from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <Router>
      <Navbar/>
      <div style={{ paddingTop: '30px' }}>
        <Routes>
          <Route path="/" element={<FlashcardsPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-card" element={<CreateCardPage/>} />
        </Routes> 
      </div>
      
    </Router>
  )
}

export default App
