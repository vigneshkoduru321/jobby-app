import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

class Jobs extends Component {
  state = {
    profileStatus: 'Initial',
    profileData: {},
    resultStatus: 'Initial',
    jobsData: [],
    selectedPak: '',
    search: '',
    searchValue: '',
    noProduct: false,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getJobsData = async () => {
    const {selectedPak, searchValue} = this.state
    this.setState({resultStatus: 'InProgress'})
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=${selectedPak}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      if (fetchedData.total === 0) {
        this.setState({noProduct: true})
      } else {
        this.setState({noProduct: false})
      }
      const {jobs} = fetchedData

      const updatedData = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsData: updatedData, resultStatus: 'Success'})
    } else {
      this.setState({resultStatus: 'Failure'})
    }
  }

  getProfileData = async () => {
    this.setState({profileStatus: 'InProgress'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const details = fetchedData.profile_details
      const updatedData = {
        profileImageUrl: details.profile_image_url,
        name: details.name,
        shortBio: details.short_bio,
      }
      this.setState({profileStatus: 'Success', profileData: updatedData})
    } else {
      this.setState({profileStatus: 'Failure'})
    }
  }

  InProgressPro = () => (
    <div testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  InProgressRes = () => (
    <div testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  SuccessPro = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-back">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  onRetry = () => {
    this.getProfileData()
  }

  FailurePro = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.onRetry}>Retry</button>
    </div>
  )

  renderProfileStatus = () => {
    const {profileStatus} = this.state
    console.log(profileStatus)
    switch (profileStatus) {
      case 'InProgress':
        return this.InProgressPro()
      case 'Failure':
        return this.FailurePro()
      case 'Success':
        return this.SuccessPro()

      default:
        return null
    }
  }

  retry = () => {
    this.getJobsData()
  }

  FailureRes = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.retry}>Retry</button>
    </div>
  )

  SuccessRes = () => {
    const {jobsData} = this.state

    return (
      <div>
        {jobsData.map(each => (
          <JobCard details={each} key={each.id} />
        ))}
      </div>
    )
  }

  renderResultsStatus = () => {
    const {resultStatus} = this.state
    switch (resultStatus) {
      case 'InProgress':
        return this.InProgressRes()
      case 'Failure':
        return this.FailureRes()
      case 'Success':
        return this.SuccessRes()

      default:
        return null
    }
  }

  onChange = event => {
    const {selectedPak} = this.state
    this.setState({selectedPak: event.target.value}, this.getJobsData)
  }

  onChangeCheck = event => {
    console.log(event.target.value)
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onClickSearch = () => {
    const {search} = this.state
    this.setState({searchValue: search}, this.getJobsData)
  }

  render() {
    const {selectedPak, search, noProduct} = this.state
    return (
      <div className="con">
        <Header />
        <div className="main-container">
          <ul className="filter">
            <div>{this.renderProfileStatus()}</div>
            <hr className="hr" />
            <li className="type-filter">
              <h1>Type of Employment</h1>
              <div className="type">
                <input
                  value="FULLTIME"
                  onChange={this.onChangeCheck}
                  id="fullTime"
                  type="checkbox"
                />
                <label htmlFor="fullTime">Full Time</label>
              </div>
              <div className="type">
                <input id="partTime" type="checkbox" />
                <label htmlFor="partTime">Part Time</label>
              </div>
              <div className="type">
                <input id="freelance" type="checkbox" />
                <label htmlFor="freelance">Freelance</label>
              </div>
              <div className="type">
                <input id="internship" type="checkbox" />
                <label htmlFor="internship">Internship</label>
              </div>
            </li>
            <hr className="hr" />
            <ul className="salary-range">
              <h1>Salary Range</h1>
              <div className="salary">
                <input
                  value="1000000"
                  onChange={this.onChange}
                  name="salary"
                  type="radio"
                  id="10"
                />
                <label htmlFor="10">10 LPA and above</label>
              </div>
              <div className="salary">
                <input
                  value="2000000"
                  onChange={this.onChange}
                  name="salary"
                  type="radio"
                  id="20"
                />
                <label htmlFor="20">20 LPA and above</label>
              </div>
              <div className="salary">
                <input
                  value="3000000"
                  onChange={this.onChange}
                  name="salary"
                  type="radio"
                  id="30"
                />
                <label htmlFor="30">30 LPA and above</label>
              </div>
              <div className="salary">
                <input
                  value="4000000"
                  onChange={this.onChange}
                  name="salary"
                  type="radio"
                  id="40"
                />
                <label htmlFor="40">40 LPA and above</label>
              </div>
            </ul>
          </ul>
          <div className="results-con">
            <div className="search-con">
              <input
                value={search}
                onChange={this.onChangeSearch}
                className="search-input"
                type="search"
              />
              <button
                onClick={this.onClickSearch}
                type="button"
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="show-results">
              {noProduct ? (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    alt="no jobs"
                  />
                  <h1>No Jobs Found</h1>
                  <p>We could not find any jobs. Try other filters</p>
                </div>
              ) : null}
              {this.renderResultsStatus()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
