import Auth from "./pages/Auth.page";

import Home from "./pages/Home.page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
