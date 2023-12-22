import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Play from './Play';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>
      <Routes>
        <Route index element={<Navigate to="/play" replace />} />
        <Route path="/play" element={<Play />} />
        {/* Altre route */}
      </Routes>
    </Router>
  );
}

export default App;
