import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiDomain } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextUser } from '../../context/userContext/userContext';

const Login = () => {
    const { dispatch } = useContext(ContextUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get(`${apiDomain}/payment/get-csrf-token/`);
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
                setError('Failed to fetch CSRF token. Please try again.');
            }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiDomain}/accounts/login/`, { username, password });

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
         
            // Fetch subscription status immediately after login
            const subscriptionStatus = await axios.get(`${apiDomain}/payment/subscription-status/`, {
                params: { user_id: res.data.user_data.id },
                headers: { 'X-CSRFToken': csrfToken }
            });


            // Update localStorage based on the subscription status
            localStorage.setItem('subscription', subscriptionStatus.data.status);

            // Navigate to the dashboard after login and fetching subscription status
            navigate('/dashboard');
        } catch (err) {
            toast.error('Invalid credentials');
            setError('Invalid credentials: ' + err.message);
        }
    };

    return (
        <div className="container my-5">
            <ToastContainer />

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
                            <h2 className="card-title text-center fw-bold"><i>Login!</i></h2>
                            <form onSubmit={handleSubmit} className="mt-4">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        className="form-control" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
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
                                        autoComplete="password"
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
