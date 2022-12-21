import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Card from '../Card'
import Skill from '../Skill'

import './index.css'

class JobsDetail extends Component {
  state = {status: 'Initial', jobDetail: {}, similarDetail: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: 'InProgress'})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (response.ok) {
      const updatedData = {
        jobDetails: fetchedData.job_details,
        similarJobs: fetchedData.similar_jobs,
      }

      const updatedJobDetails = {
        companyLogoUrl: updatedData.jobDetails.company_logo_url,
        companyWebsiteUrl: updatedData.jobDetails.company_website_url,
        employmentType: updatedData.jobDetails.employment_type,
        jobDescription: updatedData.jobDetails.job_description,
        lifeAtCompany: {
          description: updatedData.jobDetails.life_at_company.description,
          imageUrl: updatedData.jobDetails.life_at_company.image_url,
        },
        location: updatedData.jobDetails.location,
        id: updatedData.jobDetails.id,
        rating: updatedData.jobDetails.rating,
        packagePerAnnum: updatedData.package_per_annum,
        skills: updatedData.jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: updatedData.jobDetails.title,
      }
      const similarData = updatedData.similarJobs

      const updatedSimilarDetails = similarData.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetail: updatedJobDetails,
        similarDetail: updatedSimilarDetails,
        status: 'Success',
      })
    } else {
      this.setState({status: 'Failure'})
    }
  }

  renderLoading = () => (
    <div testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {status, jobDetail, similarDetail} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      title,
      employmentType,
      location,
      jobDescription,
      packagePerAnnum,
      skills,
      lifeAtCompany,
    } = jobDetail
    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <div className="job-con">
          <img src={companyLogoUrl} alt="job details company logo" />
          <h1>{title}</h1>
          <p>{rating}</p>
          <p>{location}</p>
          <p>{packagePerAnnum}</p>
          <p>{employmentType}</p>
          <h1>Description</h1>
          <p>{jobDescription}</p>
          <h1>Life at Company</h1>
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />

          <a href={companyWebsiteUrl}>Visit</a>
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarDetail.map(each => (
            <Card details={each} key={each.id} />
          ))}
        </ul>
        <h1>Skills</h1>
        <ul>
          {skills.map(each => (
            <Skill details={each} key={each.name} />
          ))}
        </ul>
      </div>
    )
  }

  clickRetry = () => {
    this.getData()
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.clickRetry}>Retry</button>
    </div>
  )

  renderdetail = () => {
    const {status} = this.state
    switch (status) {
      case 'InpProgress':
        return this.renderLoading()
      case 'Success':
        return this.renderSuccess()
      case 'Failure':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderdetail()}
      </div>
    )
  }
}

export default JobsDetail
