import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FibonacciVisualizer from "./components/FibonacciVisualizer";
import JumpVisualizer from "./components/JumpVisualizer";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex items-start justify-center bg-gray-50 p-4">
        <div className="flex">
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/fibonacci" element={<FibonacciVisualizer />} />
              <Route path="/jump" element={<JumpVisualizer />} />
              <Route path="/" element={<FibonacciVisualizer />} />
            </Routes>
          </main>
          <aside className="w-1/6 bg-gray-100 p-4 flex">
            <nav className="space-y-4">
              <Link to="/fibonacci" className="block text-blue-500 hover:underline">Fibonacci Visualizer</Link>
              <Link to="/jump" className="block text-blue-500 hover:underline">Jump Visualizer</Link>
            </nav>
          </aside>
        </div>
      </div>
    </Router>
  );
}

export default App;