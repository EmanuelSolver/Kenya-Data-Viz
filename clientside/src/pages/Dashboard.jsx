import SideNav from '../components/Dashboards/SideNav';
import MainDash from '../components/Dashboards/MainDash';

const Dashboard = () => {
    return (
        <div className="dashboard-container" style={{display: "flex"}}>
            <SideNav/>
            <MainDash/>
        </div>
    );
};

export default Dashboard;