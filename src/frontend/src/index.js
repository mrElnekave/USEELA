import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Map from './pages/map';
import Home from './pages/home';
import GamePage from './pages/game';
import Lobby from './pages/lobby';
import LookForQuiz from './pages/lookForQuiz';
import Profile from './pages/profile';
import Leaderboard from './pages/leaderboard';
import ImageUpload from './pages/ImageUpload';
import QuizTest from './pages/QuizTest';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/lobby",
    element: <Lobby/>,
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
  {/*
    path: "/lobby",
    element: <Lobby/>,
*/},
  {
    path: "/lookForQuiz",
    element: <LookForQuiz/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard/>,
  },
  {
    path: "/imageUpload",

    element: <ImageUpload/>,
  },
  {
    path: "/QuizTest",
    element: <QuizTest/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);