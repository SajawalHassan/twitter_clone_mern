import Register from "./pages/Register.page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.page";
import Verification from "./pages/Verification.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </Router>
  );
}

export default App;
