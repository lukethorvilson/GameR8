import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ratings from "./pages/Ratings";
import GamePage from "./pages/GamePage";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import { LoginProvider } from "./contexts/LoginContext";
// import {SnackbarProvider, useSnackbar} from "notistack";

function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
