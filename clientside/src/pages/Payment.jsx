import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card payment
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/payment', {
        fullName,
        email,
        address,
        cardNumber,
        expiryDate,
        cvv,
        mpesaNumber,
        paymentMethod
      });

      setSuccess(true);
      navigate('/macroeconomic-analysis');
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.log(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-75">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">Payment</h2>
            {success ? (
              <div className="alert alert-success">Payment successful! You now have access to premium content.</div>
            ) : (
              <>
                <form onSubmit={handlePayment} className="mt-4">
                  {error && <div className="alert alert-danger">{error}</div>}

                  {/* Payment Method Selection */}
                  <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                    <select
                      id="paymentMethod"
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="mpesa">M-Pesa</option>
                    </select>
                  </div>

                  {/* Common Fields */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    {/* Conditional Fields for Card Payment */}
                    {paymentMethod === 'card' && (
                      <>
                        <div className="col-md-6">
                          <label htmlFor="cardNumber" className="form-label">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            className="form-control"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                          <input
                            type="text"
                            id="expiryDate"
                            className="form-control"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="cvv" className="form-label">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            className="form-control"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Conditional Field for M-Pesa */}
                    {paymentMethod === 'mpesa' && (
                      <div className="col-md-6">
                        <label htmlFor="mpesaNumber" className="form-label">M-Pesa Number</label>
                        <input
                          type="text"
                          id="mpesaNumber"
                          className="form-control"
                          value={mpesaNumber}
                          onChange={(e) => setMpesaNumber(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Submit Payment</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
