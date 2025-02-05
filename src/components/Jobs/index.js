import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import JobItems from '../JobItems'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    profile: {},
    apiStatus: apiStatusConstants.initial,
    employementType: [],
    salaryRange: [],
    heading: '',
  }

  componentDidMount = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({heading: data.profile_details.name})
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    if (response.ok === true) {
      this.setState({
        profile: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profile: updatedData,
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeEmployementType = employementTypeList => {
    this.setState({employementType: employementTypeList})
  }

  onChangeSalaryRange = salaryRangeList => {
    this.setState({salaryRange: salaryRangeList})
  }

  render() {
    const {
      profile,
      apiStatus,
      salaryRange,
      employementType,
      heading,
    } = this.state
    return (
      <div className="w-100">
        <Header />
        <div className="jobs-main-container">
          <Profile
            profile={profile}
            getProfileDetails={this.getProfileDetails}
            onChangeEmployementType={this.onChangeEmployementType}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
          <div className="mt-5 w-100">
            <JobItems
              salaryRange={salaryRange.length > 0 ? salaryRange.join() : ''}
              employementType={
                employementType.length > 0 ? employementType.join() : ''
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
