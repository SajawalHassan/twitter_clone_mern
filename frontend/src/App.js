import Auth from "./pages/Auth.page";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.comp";
import Home from "./pages/Home.page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
