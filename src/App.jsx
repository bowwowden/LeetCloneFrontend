// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home'; // Rename this component to reflect the shared content
import Problems from './Problems';
import Blog from './Blog';
import ProblemPage from "./ProblemPage"; // Adjust the path to match your actual file structure
import BlogRouter from './BlogRouter';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/*" element={<BlogRouter />} />
          <Route path="/problems/:id" element={<ProblemPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
