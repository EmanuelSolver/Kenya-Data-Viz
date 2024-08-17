import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import axios from 'axios';

const Profile = () => {
    const { user } = useContext(ContextUser);
    const [location, setLocation] = useState('Fetching location...');

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { data } = await axios.get('https://ipapi.co/json/');
                setLocation(`${data.city}, ${data.country_name}`);
            } catch (error) {
                console.error('Error fetching location:', error);
                setLocation('Unable to fetch location');
            }
        };

        fetchLocation();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: '80vw', height: '50vh' }}>
            {user && (
                <div className="card text-center" style={{ width: '80vw', maxWidth: '500px' }}>
                    <div className="card-body">
                        <h5 className="card-title">{user.user_data.username}, Welcome to Kenya Data Viz</h5>
                        <p className="card-text">This is your profile information.</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Name: {`${user.user_data.first_name} ${user.user_data.last_name}`}</li>
                            <li className="list-group-item">Email: {user.user_data.email}</li>
                            <li className="list-group-item">Location: {location}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
