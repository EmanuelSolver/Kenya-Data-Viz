// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MacroeconomicAnalysis from './pages/MacroeconomicAnalysis';
import FinancialAnalysis from './pages/FinancialAnalysis';
import Payment from './pages/Payment';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Notfound from './pages/Notfound'
import { useContext } from 'react'
import { ContextUser } from './context/userContext/userContext'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const { user } = useContext(ContextUser);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/macroeconomic-analysis" element={ user ? <MacroeconomicAnalysis /> : <Login/>} />
        <Route path="/financial-analysis" element={ user ? <FinancialAnalysis /> : <Login/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
