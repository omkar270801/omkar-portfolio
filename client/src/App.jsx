import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './components/AuthProvider';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import { PortfolioContentProvider } from './components/PortfolioContentProvider';

function App() {
  return (
    <AuthProvider>
      <ScrollProgress />
      <CursorGlow />
      <PortfolioContentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PortfolioContentProvider>
    </AuthProvider>
  );
}

export default App;
