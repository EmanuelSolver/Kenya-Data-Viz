import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file

const Home = () => (
  <div className="container my-5">
    <div className="background-image text-overlay">
      <h1>Welcome to KenyaDataViz</h1>
      <p>
        KenyaDataViz was started with a goal of analyzing financial and macroeconomic data for Kenya with our intuitive dashboards and insights.
        If you are new here, know that
        <Link to="/register" className='text-decoration-none text-white'> <b>joining is easy!</b></Link>
      </p>
      <div className="clearfix"></div> {/* Clear float */}

    </div>

    <div className="row mt-5">
        <div className="col-md-12 text-center mt-4">
            <h2>Our Services</h2>
            <hr />

        </div>
      {/* Card 1: Overview */}
      <div className="col-md-4 mb-4">
        <div className="card">
          <img src="https://www.domenzavrl.com/wp-content/uploads/2020/06/Macroeconomics.jpg" className="card-img-top" alt="Overview" />
          <div className="card-body">
            <h5 className="card-title">Overview</h5>
            <p className="card-text">Get a comprehensive overview of Kenya’s macroeconomic indicators and financial data.</p>
            <Link to="/macroeconomic-analysis" className="btn btn-primary">Explore Macroeconomics</Link>
          </div>
        </div>
      </div>

      {/* Card 2: Financial Analysis */}
      <div className="col-md-4 mb-4">
        <div className="card">
          <img src="https://innovatureinc.com/wp-content/uploads/2022/07/2-10.jpg" className="card-img-top" alt="Financial Analysis" />
          <div className="card-body">
            <h5 className="card-title">Financial Analysis</h5>
            <p className="card-text">Dive into detailed financial analytics with real-time data and historical trends.</p>
            <Link to="/financial-analysis" className="btn btn-primary">Explore Financials</Link>
          </div>
        </div>
      </div>

      {/* Data Visualization */}
      <div className="col-md-4 mb-4">
        <div className="card">
          <img src="https://assets.everspringpartners.com/dims4/default/e797ff3/2147483647/strip/true/crop/620x250+0+0/resize/620x250!/quality/90/?url=http%3A%2F%2Feverspring-brightspot.s3.us-east-1.amazonaws.com%2Fe4%2F2a%2Fe9a3904c4f17a084c100bbbb5eca%2Fdata-visualization-for-accountants-620x250.jpg" className="card-img-top" alt="Data Visualization" />
          <div className="card-body">
            <h5 className="card-title">Data Visualization</h5>
            <p className="card-text">Visualize data with our interactive charts and graphs for better insights.</p>
            <Link to="/register" className="btn btn-primary">See Visualizations</Link>
          </div>
        </div>
      </div>
    </div>

    {/* Analytics chart */}
    <div className="row">
      <div className="col-md-12 text-center mt-4">
        <h2>Latest Analytics</h2>
        <div className="card">
          <div className="card-body">
            {/* Placeholder for a chart */}
            <img src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F380ddcf7-2064-4229-a36a-2c43eac22f50_1076x808.png" className="card-img-top" alt="Financial Analysis" />

          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
