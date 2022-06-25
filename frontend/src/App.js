import Auth from "./pages/Auth.page";
import Home from "./pages/Home.page";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.comp";
import Explore from "./pages/Explore.page";
import Profile from "./pages/Profile.page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:_id" element={<Profile />} />
        </Route>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
