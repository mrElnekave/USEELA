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
import QuizDisplay from './pages/QuizDisplay';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

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
    path: "/login", 
    element: <Login/>
  },
  {
    path: "/signup", 
    element: <SignUp/>
  },
  {
    path: "/home",
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
  {
    path: "/game/:gameId",
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
    path: "/profile/:userid",
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
    path: "/QuizDisplay/:quizId",
    element: <QuizDisplay/>,
  },
  {
    path: "/QuizTest/",
    element: <QuizTest/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);