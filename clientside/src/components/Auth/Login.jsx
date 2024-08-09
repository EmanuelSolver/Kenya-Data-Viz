import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiDomain } from '../../utils/utils'
import { Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ apiDomain }/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/macroeconomic-analysis');
    } catch (err) {
      setError('Invalid credentials: ', err);
    }
  };

  return (
    <div className="container my-5">
        <div className="row d-flex align-items-center">
            <div className="col-md-6">
                <img 
                    src="https://nordvpn.com/wp-content/uploads/blog-social-nordvpn-login-and-sign-up-process-explained-1200x628-2.png" 
                    alt="signin" 
                    className="img-fluid rounded" 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>

            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Login</h2>
                        <form onSubmit={handleSubmit} className="mt-4">
                            {error && <div className="alert alert-danger">{error}</div>}
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

                            <button type="submit" className="btn btn-primary">Login</button>
                            <div className="mb-3 text-center">
                                <Link to="/register" className='text-decoration-none'>Are you New here? Create an Account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        </div>  
    </div>
  );
};

export default Login;
