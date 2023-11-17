import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Map from './pages/map';
import Home from './pages/home';
import GamePage from './pages/game';
import ImageUpload from './pages/ImageUpload';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/map",
    element: <Map/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/game",
    element: <GamePage/>,
  },
  {
    path: "/ImageUpload",
    element: <ImageUpload/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);