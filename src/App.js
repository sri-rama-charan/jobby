import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import JobContext from './Context/JobContext'
import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
  initial: 'INITIAL',
}

class App extends Component {
  state = {}

  getJobItems = async myObj => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    let {employementType, salaryRange} = myObj
    const {search} = myObj
    if (salaryRange === undefined) {
      salaryRange = ''
    }
    if (employementType === undefined) {
      employementType = ''
    }
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employementType}&minimum_package=${salaryRange}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {jobsList, apiStatus} = this.state
    return (
      <JobContext.Provider
        value={{getJobItems: this.getJobItems, apiStatus, jobsList}}
      >
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/jobs" component={Jobs} />
            <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </JobContext.Provider>
    )
  }
}
export default App
