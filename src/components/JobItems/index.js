import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItemCard from '../JobItemCard'
import JobContext from '../../Context/JobContext'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
  initial: 'INITIAL',
}

class JobItems extends Component {
  state = {
    search: '',
  }

  componentDidMount = () => {
    const {search} = this.state
    const {getJobItems} = this.context
    const myObj = {search}
    getJobItems(myObj)
  }

  render() {
    return (
      <JobContext.Consumer>
        {value => {
          const {getJobItems, jobsList, apiStatus} = value
          const {search} = this.state
          const {salaryRange, employementType} = this.props
          const onChangeSearchInput = event => {
            this.setState({search: event.target.value})
          }

          const onGetJobItems = () => {
            getJobItems({salaryRange, employementType, search})
          }

          const renderSuccessView = () => (
            <div className=" w-100">
              <div
                style={{height: '42px', width: '258px'}}
                className="md-input-bg-container w-25 d-flex flex-row justify-content-between mt-5 ml-5"
              >
                <input
                  placeholder="Search"
                  className="input-element flex-grow-1"
                  type="search"
                  onChange={onChangeSearchInput}
                  data-testid="searchButton"
                />
                <button
                  className=" btn"
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

              <div className="w-100">
                <ul
                  style={{listStyleType: 'none'}}
                  className="w-100 p-3 p-md-5"
                >
                  {jobsList.map(item => (
                    <li key={item.id}>
                      <JobItemCard cardDetails={item} key={item.id} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )

          const loadingView = () => (
            <div
              className="loader-item-container  loader-container w-100 d-flex flex-row justify-content-center align-items-center"
              data-testid="loader"
            >
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          )

          const renderNotFound = () => (
            <div
              style={{height: '100vh'}}
              className="w-100 d-flex flex-column justify-content-center align-items-center"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1 style={{color: 'white'}}>No Jobs Found</h1>
              <p style={{color: 'white'}}>
                We could not find any jobs. Try other filters
              </p>
            </div>
          )

          const failureView = () => (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
              />
              <h1 style={{color: 'white'}}>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button
                onClick={onGetJobItems}
                type="button"
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          )

          switch (apiStatus) {
            case apiStatusConstants.success:
              if (jobsList.length === 0) {
                return renderNotFound()
              }
              return renderSuccessView()

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
JobItems.contextType = JobContext

export default JobItems
