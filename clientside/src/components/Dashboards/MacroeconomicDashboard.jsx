import NominalGDPChart from '../Datapoints/NominalGDPChart';
import PopulationChart from '../Datapoints/PopulationChart';
import GDPPerCapitaChart from '../Datapoints/GDPPerCapitaChart';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row my-4">
            <h1 className="text-center bg-light p-4 rounded shadow-sm text-primary">
                Macroeconomics Dashboard
            </h1>

            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">
                            Nominal GDP (KE)
                        </div>
                        <div className="card-body">
                            <NominalGDPChart />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">
                            Population (KE)
                        </div>
                        <div className="card-body">
                            <PopulationChart />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            GDP per Capita (KE)
                        </div>
                        <div className="card-body">
                            <GDPPerCapitaChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
