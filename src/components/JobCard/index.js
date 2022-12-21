import './index.css'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <Link className="Link" to={`/jobs/${id}`}>
      <div className="conn">
        <div>
          <img src={companyLogoUrl} className="com-logo" alt="company logo" />
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
