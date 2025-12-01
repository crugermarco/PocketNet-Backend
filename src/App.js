import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PocketNetStore from './components/PocketNetStore';
import Success from './Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PocketNetStore />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;