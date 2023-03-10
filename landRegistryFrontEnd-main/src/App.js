import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/home/Login';
import SroHome from './components/sro/SroHome';
import BankHome from './components/bank/BankHome';
import RevenueHome from './components/revenue/RevenueHome';
import SroAddLand from './components/sro/SroAddLand';
import SroDeleteLand from './components/sro/SroDeleteLand';
import SroUpdateLand from './components/sro/SroUpdateLand';
import SroSearchLand from './components/sro/SroSearchLand';

function App() {


  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/sroHome" element={<SroHome />} />
          <Route path="/sroAddLand" element={<SroAddLand />} />
          <Route path="/sroSearchLand" element={<SroSearchLand />} />
          <Route path="/sroDeleteLand" element={<SroDeleteLand />} />
          <Route path="/sroUpdateLand" element={<SroUpdateLand />} />

          <Route path="/bankHome" element={<BankHome />} />
          <Route path="/revenueHome" element={<RevenueHome />} />
        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;
