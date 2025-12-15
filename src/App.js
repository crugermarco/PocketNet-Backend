import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PocketNetStore from './components/PocketNetStore';
import Success from './components/Success'; 

function App() {
  console.log('✅ App montada - Router configurado');
  
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<PocketNetStore />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
