import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { ContextUser } from "../../context/userContext/userContext";
import PropTypes from 'prop-types';

const SubscriptionStatus = ({ onStatusChange }) => {
    const [status, setStatus] = useState(localStorage.getItem('subscription') || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(ContextUser);
    const [csrfToken, setCsrfToken] = useState('');


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
        const fetchSubscriptionStatus = async () => {
            try {
                const response = await axios.get(`${apiDomain}/payment/subscription-status/`, {
                    params: { user_id: user.user_data.id },
                    headers: { 'X-CSRFToken': csrfToken }
                });

                if (response.data.status === 'active') {
                    setStatus('active');
                    localStorage.setItem('subscription', 'active');
                } else {
                    setStatus('inactive');
                    localStorage.setItem('subscription', 'inactive');
                }
                onStatusChange(response.data.status); // Notify parent component of status
            } catch (error) {
                console.error('Error checking subscription status:', error);
                setError('Error checking subscription status.');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.access) {
            fetchCsrfToken();
            fetchSubscriptionStatus();
        } else {
            setLoading(false);
        }
    }, [user, csrfToken, onStatusChange]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>{status === 'active' ? 'You are a full member!' : 'Subscription status: inactive'}</div>;
};

// PropTypes validation
SubscriptionStatus.propTypes = {
    onStatusChange: PropTypes.func.isRequired, // onStatusChange must be a function
};

export default SubscriptionStatus;
