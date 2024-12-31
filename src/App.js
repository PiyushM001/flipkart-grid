import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home'; // Assuming you will create a Home component
import Login from './components/login'; // Assuming you will create a Login component
import Dashboard from './components/dashboard';
import HistoryPopup from './components/history';
import HistoryPopup2 from './components/history2';
import Nutrition from './components/nutrition';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/history/products" element={<HistoryPopup/>} />
        <Route path="/history/fruits" element={<HistoryPopup2/>} />
        <Route path="/nutrition" element={<Nutrition/>}/>
      </Routes>
    </Router>
  );
}

export default App;
