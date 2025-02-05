import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import JobContext from '../../Context/JobContext'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
  initial: 'INITIAL',
}

let selectedEmployementTypes = []
let selectedSalaryRange = []

class Profile extends Component {
  state = {jobsList: [], search: '', employementType: [], salaryRange: []}

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  render() {
    return (
      <JobContext.Consumer>
        {value => {
          const {getJobItems, apiStatus} = value
          const {search, employementType, salaryRange} = this.state

          const onGetJobItems = () => {
            getJobItems({search, employementType, salaryRange})
          }

          const changeSalaryRange = event => {
            const {id, checked} = event.target
            const {onChangeSalaryRange} = this.props
            if (checked) {
              selectedSalaryRange.push(id)
              this.setState({salaryRange: selectedSalaryRange})
              onChangeSalaryRange(selectedSalaryRange)
              onGetJobItems()
            } else {
              selectedSalaryRange = selectedSalaryRange.filter(
                item => item !== id,
              )
              this.setState({salaryRange: selectedSalaryRange})
              onChangeSalaryRange(selectedSalaryRange)
            }
          }

          const changeEmployementType = event => {
            const {id, checked} = event.target
            const {onChangeEmployementType} = this.props
            if (checked) {
              selectedEmployementTypes.push(id)
              this.setState({employementType: selectedEmployementTypes})
              onChangeEmployementType(selectedEmployementTypes)
              onGetJobItems()
            } else {
              selectedEmployementTypes = selectedEmployementTypes.filter(
                item => item !== id,
              )
              this.setState({employementType: selectedEmployementTypes})
              onChangeEmployementType(selectedEmployementTypes)
            }
          }

          const retryProfile = () => {
            const {getProfileDetails} = this.props
            getProfileDetails()
          }

          const loadingView = () => (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          )

          const failureView = () => (
            <div className="d-flex flex-row justify-content-center">
              <button
                onClick={retryProfile}
                type="button"
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          )

          const successView = () => {
            const {profile} = this.props

            return (
              <div className="jobs-filters-bg-container mt-5 p-3">
                <div
                  style={{height: '42px', width: '258px'}}
                  className="w-100 input-bg-container d-md-none d-flex flex-row mt-3"
                >
                  <input
                    placeholder="Search"
                    className="input-element flex-grow-1"
                    type="search"
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    className="d-inline btn"
                    style={{backgroundColor: '#272727'}}
                    type="button"
                    data-testid="searchButton"
                    onClick={onGetJobItems}
                  >
                    <IoIosSearch
                      className="pb-1"
                      style={{color: 'white', height: '25px'}}
                    />
                  </button>
                </div>

                <div className="profile-bg-container p-3 ">
                  <img
                    src={profile.profileImageUrl}
                    className="profile-img"
                    alt="profile"
                  />
                  <h1 style={{color: '#6366f1', fontSize: '28px'}}>
                    {profile.name}
                  </h1>
                  <p>{profile.shortBio}</p>
                </div>
                <hr style={{color: '#7e858e', backgroundColor: '#7e858e'}} />

                <div className="d-flex flex-column justify-content-center">
                  <h1 style={{color: 'white', fontSize: '20px'}}>
                    Type of Employement
                  </h1>
                  <ul style={{listStyleType: 'none'}}>
                    {employmentTypesList.map(item => (
                      <li key={item.employmentTypeId}>
                        <input
                          onChange={changeEmployementType}
                          id={item.employmentTypeId}
                          type="checkbox"
                          checked={employementType.includes(
                            item.employmentTypeId,
                          )}
                        />
                        <label
                          className="ml-1"
                          style={{color: 'white', cursor: 'pointer'}}
                          htmlFor={item.employmentTypeId}
                        >
                          {item.label}
                        </label>
                        <br />
                      </li>
                    ))}
                  </ul>

                  <br />
                </div>
                <hr style={{color: '#7e858e', backgroundColor: '#7e858e'}} />

                <div>
                  <h1 style={{color: 'white', fontSize: '20px'}}>
                    Salary Range
                  </h1>
                  <ul style={{listStyleType: 'none'}}>
                    {salaryRangesList.map(item => (
                      <li key={item.salaryRangeId}>
                        <input
                          onChange={changeSalaryRange}
                          id={item.salaryRangeId}
                          type="checkbox"
                          checked={salaryRange.includes(item.salaryRangeId)}
                        />
                        <label
                          className="ml-1"
                          style={{color: 'white', cursor: 'pointer'}}
                          htmlFor={item.salaryRangeId}
                        >
                          {item.label}
                        </label>
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          }
          switch (apiStatus) {
            case apiStatusConstants.success:
              return successView()

            case apiStatusConstants.inprogress:
              return loadingView()

            case apiStatusConstants.failure:
              return failureView()

            default:
              return null
          }
        }}
      </JobContext.Consumer>
    )
  }
}

export default Profile
