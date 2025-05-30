import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import Logout from './components/Logout';
import DashboardRouter from './pages/DashboardRouter';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path ="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardRouter />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}