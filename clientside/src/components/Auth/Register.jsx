import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiDomain } from '../../utils/utils';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${apiDomain}/auth/register`, { name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
      console.log(err);
    }
  };

  return (
    <div className="container my-5">
      <div className="row d-flex align-items-center">
        {/* Form Column */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleSubmit} className="mt-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    className="form-control" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                  />
                </div>

                <div className="row mb-3">
                  <button type="submit" className="btn btn-primary col-md-6">Register Free</button>
                  <Link to="/payment" className="btn btn-secondary col-md-6 text-decoration-none">Pay Premium</Link>
                </div>
                <div className="text-center">
                  <Link to="/login" className="text-primary text-decoration-none">Already have an account? Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div className="col-md-6">
          <img 
            src="https://www.indiafilings.com/learn/wp-content/uploads/2023/03/Where-can-I-register-a-firm-in-India.jpg" 
            alt="Registration" 
            className="img-fluid rounded" 
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
