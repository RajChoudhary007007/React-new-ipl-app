import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    cardsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCardList()
  }

  getCardList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const updatedData = teams.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      teamImageUrl: eachData.team_image_url,
    }))
    this.setState({cardsData: updatedData, isLoading: false})
  }

  render() {
    const {cardsData, isLoading} = this.state

    return (
      <div className="app-container">
        <div className="home-container">
          <div className="heading-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
              alt="ipl logo"
            />
            <h1 className="ipl-heading">IPL Dashboard</h1>
          </div>
          <ul className="card-container">
            {isLoading ? (
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            ) : (
              cardsData.map(eachData => (
                <TeamCard key={eachData.id} dataDetails={eachData} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default Home
