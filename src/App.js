import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pagine (le creeremo in seguito nelle rispettive cartelle)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
// import NotFound from './pages/NotFound'; // Crea una pagina 404 se vuoi

function App() {
  return (
    <Router>
      <Navbar /> {/* Questo componente sarà la tua barra di navigazione */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Pagina Home */}
        <Route path="/register" element={<Register />} /> {/* Pagina di Registrazione */}
        <Route path="/login" element={<Login />} /> {/* Pagina di Login */}

        {/* Rotte private per utenti e admin (accessibili solo dopo il login) */}
        <Route element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book/:fieldId" element={<BookingPage />} />
          {/* Aggiungi qui altre rotte accessibili a tutti gli utenti loggati */}
        </Route>

        {/* Rotte private solo per gli amministratori */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Aggiungi qui le rotte di gestione admin */}
        </Route>

        {/* Rotta di fallback per pagine non trovate (se crei NotFound.js) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer /> {/* Questo componente sarà il footer della pagina */}
    </Router>
  );
}

export default App;