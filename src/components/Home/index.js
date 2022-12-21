import {withRouter, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const sample = 'sample'

  return (
    <div className="home-con">
      <Header />
      <div className="home-background">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs,salary information,company
          reviews.find the jobs that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="button-find">Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}

export default withRouter(Home)
