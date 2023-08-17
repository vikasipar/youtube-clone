import React from 'react';
import { Routes, Route} from 'react-router-dom';
import WatchVideo from "./components/WatchVideo";
import HomePage from './components/HomePage';

function MyRoutes() {
  return (
    <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/watch/:videoId' element={<WatchVideo />} />
    </Routes>
  );
}

export default MyRoutes;
