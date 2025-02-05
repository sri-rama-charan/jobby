import {Link, withRouter} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  console.log('home')
  return (
    <div>
      <Header />
      <div className="home-content-bg-container d-flex flex-column justify-content-center p-5">
        <div style={{width: '45%'}}>
          <h1 style={{color: 'white', fontWeight: '700', fontSize: '46px'}}>
            Find the Job That Fits Your Life
          </h1>
          <p style={{color: 'white'}}>
            millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="btn find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
