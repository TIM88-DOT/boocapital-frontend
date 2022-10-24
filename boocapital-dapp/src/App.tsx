import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header/header';
import Contest from './pages/dashboard/dashboard';
import Main from './pages/main/main';

function App() {

  return (
    
    <BrowserRouter>
      <div className="app">
      <div className='head'>
        <Header/>
      </div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contest" element={<Contest />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
