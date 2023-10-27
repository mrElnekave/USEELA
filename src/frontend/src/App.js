import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home />}>

          </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
