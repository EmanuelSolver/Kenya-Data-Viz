import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand fw-bold" to="/">KenyaDataViz</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-5"> {/* Add margin-end */}
          <Link className="nav-link" to="/macroeconomic-analysis">Macroeconomics</Link>
        </li>
        <li className="nav-item me-5"> {/* Add margin-end */}
          <Link className="nav-link" to="/financial-analysis">Financials</Link>
        </li>
        <li className="nav-item me-5"> {/* Add margin-end */}
          <Link className="nav-link text-primary fw-bold" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Sign in</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
