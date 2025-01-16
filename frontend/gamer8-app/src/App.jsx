import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import React, { useContext, Suspense } from 'react';
import LoadingPage from './pages/LoadingPage';
import { AuthContext } from './contexts/AuthContext';

// Lazy loading of components
const Layout = React.lazy(() => import('./pages/Layout')); // lazy load layout
const Homepage = React.lazy(
  () => import('./pages/HomePage'),
);
const Ratings = React.lazy(() => import('./pages/Ratings'));
const GamePage = React.lazy(
  () => import('./pages/GamePage'),
);
const ProfilePage = React.lazy(
  () => import('./pages/ProfilePage'),
);

const Register = React.lazy(
  () => import('./pages/Register'),
);
const Login = React.lazy(() => import('./pages/Login'));

function App() {
  // check if user is authenticated
  const { isLoading, isAuthenticated } = useContext(AuthContext);
  // method of preventing users from accessing pages without being logged in

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<Homepage />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route
              path="/game/:id"
              element={<GamePage />}
            />
            <Route
              path="/profile/:id"
              element={<ProfilePage />}
            />
          </Route>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/"/> : <Register />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
