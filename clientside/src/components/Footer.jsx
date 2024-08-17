import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Footer = () => (
  <footer className="bg-light text-dark py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-3">
          <h5>About Us</h5>
          <p>KenyaDataViz provides insightful financial and macroeconomic data for Kenya. Our platform provides interactive dashboards and comprehensive analysis.</p>
        </div>

        <div className="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><Link to="/" className="text-dark text-decoration-none">Home</Link></li>
            <li><Link to="/register" className="text-dark text-decoration-none">Signup</Link></li>
            <li><Link to="/login" className="text-dark text-decoration-none">Signin</Link></li>
          </ul>
        </div>

        <div className="col-md-4 mb-3">
          <h5>Contact Us</h5>
          <p>Email: <a href="mailto:info@kenyadatazviz.com" className="text-dark text-decoration-none">info@kenyadatazviz.com</a></p>
          <p>Phone: <a href="tel:+254700000000" className="text-dark text-decoration-none">+254 700 000 000</a></p>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="mb-0">© {new Date().getFullYear()} KenyaDataViz. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
