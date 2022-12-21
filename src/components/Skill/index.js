const Skill = props => {
  const {details} = props
  const {imageUrl, name} = details
  console.log(details)
  return (
    <div>
      <p>{name}</p>
      <img src={imageUrl} alt={name} />
    </div>
  )
}

export default Skill
