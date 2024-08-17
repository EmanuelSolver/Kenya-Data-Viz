import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiDomain } from '../../utils/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`${apiDomain}/accounts/register/`, {
          username: values.username,
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password
        });
        toast.success('Registration successful');
        navigate('/login');
      } catch (err) {
        toast.error('Registration failed');
        console.log(err);
      }
    }
  });

  return (
    <div className="container my-5">
      <div className="row d-flex align-items-center">
        {/* Form Column */}
        <div className="col-md-6">
          <ToastContainer />

          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center fw-bold"><i>Register!</i></h2>
              <form onSubmit={formik.handleSubmit} className="mt-4">
                {formik.errors && formik.touched && (
                  <div className="alert">{formik.errors.general}</div>
                )}

                <div className='row mb-3'>
                    <div className="col-md-6">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        {...formik.getFieldProps('username')}
                      />
                      {formik.errors.username && formik.touched.username && (
                        <div className="text-danger">{formik.errors.username}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        {...formik.getFieldProps('email')}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                      )}
                    </div>
                </div>


                <div className="row mb-3">
                  <div className='col-md-6'>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      {...formik.getFieldProps('firstName')}
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                      <div className="text-danger">{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      {...formik.getFieldProps('lastName')}
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                      <div className="text-danger">{formik.errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className='col-md-6'>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div className="text-danger">{formik.errors.password}</div>
                    )}
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                      <div className="text-danger">{formik.errors.confirmPassword}</div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <div >
                    <button type="submit" className="btn btn-primary w-100">Register Free</button>
                  </div>

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


