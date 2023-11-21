import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Dummy from './pages/dummy';
import Navbar from './components/Navbar';
import ImageUpload from './pages/ImageUpload';
import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <h1>Main Page</h1>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dummy' element={<Dummy />} />
        <Route path='/ImageUpload' element={<ImageUpload />} />
      </Routes>
    </>
  );
}

export default App;
