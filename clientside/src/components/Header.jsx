import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useContext, useState } from 'react';
import { ContextUser } from '../context/userContext/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDollarSign, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    const { user, dispatch } = useContext(ContextUser);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem('subscription'); // Corrected method to remove item from localStorage
    };
    

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand fw-bold" to="/">KenyaDataViz</Link>
            <button 
                className="navbar-toggler" 
                type="button" 
                onClick={toggleMenu} 
                aria-controls="navbarNav" 
                aria-expanded={isMenuOpen} 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-5">
                        <Link className="nav-link" to="/macroeconomic-analysis">
                            <FontAwesomeIcon icon={faChartLine} /> Macroeconomics
                        </Link>
                    </li>
                    <li className="nav-item me-5">
                        <Link className="nav-link" to="/financial-analysis">
                            <FontAwesomeIcon icon={faDollarSign} /> Financials
                        </Link>
                    </li>
                    <li className="nav-item me-5">
                        <Link className="nav-link text-primary fw-bold" to="/register">
                            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                        </Link>
                    </li>
                    <li className="nav-item me-5">
                        <Link className="nav-link" to="/login">
                            <FontAwesomeIcon icon={faSignInAlt} /> Sign in
                        </Link>
                    </li>
                    {user && (
                        <li className="nav-item">
                            <Link 
                                className="nav-link alert-danger fw-bold" 
                                to="/login" 
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} /> LogOut
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
