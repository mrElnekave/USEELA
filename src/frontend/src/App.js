import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Map from './pages/map';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>Main Page</h1>
    </div>
  );
}

export default App;
