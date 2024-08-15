import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    return (
        <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Profile</h5>
                            <p className="card-text">This is your profile information.</p>
                            <ul className="list-group">
                                <li className="list-group-item">Name: Test User</li>
                                <li className="list-group-item">Email: testuser@example.com</li>
                                <li className="list-group-item">Location: Nairobi, Kenya</li>
                            </ul>
                        </div>
                    </div>
            </div>
    );
};

export default Profile;