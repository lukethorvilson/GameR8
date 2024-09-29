import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ratings from "./pages/Ratings";
import Games from "./pages/Games";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/games" element={<Games />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
