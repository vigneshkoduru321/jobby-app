import './index.css'

const Card = props => {
  const {details} = props
  const {
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = details
  return (
    <li>
      <h1>{title}</h1>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <p>{rating}</p>
      <p>{location}</p>
      <p>{employmentType}</p>
      <img src={companyLogoUrl} alt="similar job company logo" />
    </li>
  )
}
export default Card
