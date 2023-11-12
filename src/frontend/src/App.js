import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Dummy from './pages/dummy';
import Navbar from './components/Navbar';
import ImageUpload from './pages/ImageUpload';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home />}>

          </Route>
          <Route path='/dummy' element={<Dummy />}>

          </Route>
          <Route path='/ImageUpload' element={<ImageUpload />}>
        
          </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
