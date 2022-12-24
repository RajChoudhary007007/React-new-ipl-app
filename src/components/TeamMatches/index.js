// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'

import LatestMatch from '../LatestMatch'

import './index.css'

class TeamMatches extends Component {
  state = {
    matchesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getMatchesList()
  }

  getFormattedData = newData => ({
    competingTeam: newData.competing_team,
    competingTeamLogo: newData.competing_team_logo,
    date: newData.date,
    firstInning: newData.first_innings,
    id: newData.id,
    manOfTheMatch: newData.man_of_the_match,
    matchStatus: newData.match_status,
    result: newData.result,
    secondInning: newData.second_innings,
    umpires: newData.umpires,
    venue: newData.venue,
  })

  getMatchesList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachData =>
        this.getFormattedData(eachData),
      ),
    }
    console.log(updatedData)
    this.setState({matchesList: updatedData, isLoading: false})
  }

  render() {
    const {matchesList, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchesList

    return (
      <>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <div className="team-container-app">
            <div className="team-container-home">
              <img
                className="banner-image"
                src={teamBannerUrl}
                alt="team banner"
              />
              <LatestMatch latestMatchData={latestMatchDetails} />
              <ul className="recent-matches-list">
                {recentMatches.map(eachMatch => (
                  <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default TeamMatches
