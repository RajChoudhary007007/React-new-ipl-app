// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {dataDetails} = props
  const {id, name, teamImageUrl} = dataDetails
  return (
    <Link className="blog-item-link" to={`/team-matches/${id}`}>
      <li className="card-item">
        <img className="card-image" src={teamImageUrl} alt={name} />
        <h1 className="image-heading">{name}</h1>
      </li>
    </Link>
  )
}
export default TeamCard
