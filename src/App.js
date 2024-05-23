import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Visualize from './components/VisualData';
import Predict from './components/prediction';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
