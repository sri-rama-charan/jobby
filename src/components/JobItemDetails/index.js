import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiSuitcaseFill} from 'react-icons/ri'
import {BsBoxArrowInUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  constructor(props) {
    super(props)
    const {match} = props
    const {id} = match.params
    this.state = {
      id,
      apiStatus: apiStatusConstants.initial,
      jobsDetails: {},
    }
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {id} = this.state
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const updatedSkills = data.job_details.skills.map(item => ({
        imageUrl: item.image_url,
        name: item.name,
      }))
      const updatedSimilarJobs = data.similar_jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: updatedLifeAtCompany,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: updatedSkills,
        title: data.job_details.title,
        similarJobs: updatedSimilarJobs,
      }
      this.setState({
        jobsDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobsDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      similarJobs,
    } = jobsDetails
    return (
      <div className="job-details-bg-container p-5">
        <Header />
        <div className="card-bg-container  w-100">
          <div className="d-flex flex-row" style={{gap: '15px'}}>
            <img
              style={{height: '70px'}}
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="d-flex flex-column">
              <h1 style={{fontSize: '24px', color: 'white'}}>{title}</h1>
              <div className="d-flex flex-row mt-1">
                <FaStar style={{color: '#fbbf24'}} />
                <div>
                  <p style={{color: 'white', fontWeight: '600'}}>{rating}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1 d-flex flex-row justify-content-between p-1">
            <div className="d-flex flex-row gap-md mt-md-3">
              <div className="d-flex flex-row ">
                <MdLocationOn style={{color: 'white', fontSize: '25px'}} />
                <p style={{color: 'white', fontWeight: '600'}}>{location}</p>
              </div>
              <div className="d-flex flex-row ">
                <RiSuitcaseFill style={{color: 'white', fontSize: '22px'}} />
                <p className="ml-1" style={{color: 'white', fontWeight: '600'}}>
                  {employmentType}
                </p>
              </div>
            </div>
            <p className="pr-4" style={{color: 'white', fontWeight: '700'}}>
              {packagePerAnnum}
            </p>
          </div>
          <hr
            style={{
              height: '1px',
              color: '#7e858e',
              backgroundColor: '#7e858e',
            }}
          />
          <p
            className="pr-4 d-flex flex-row justify-content-between"
            style={{color: 'white', fontWeight: '700'}}
          >
            <h1 style={{fontSize: '20px', color: 'white', fontWeight: '600'}}>
              Description
            </h1>
            <div>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit <BsBoxArrowInUpRight />
              </a>
            </div>
          </p>
          <p className="pr-4" style={{color: 'white', fontWeight: '600'}}>
            {jobDescription}
          </p>
          <div>
            <h1 style={{fontSize: '20px', color: 'white', fontWeight: '600'}}>
              Skills
            </h1>
            <ul
              style={{listStyleType: 'none'}}
              className="skills-list-container mt-md-5"
            >
              {skills.map(item => (
                <li
                  key={item.name}
                  className="d-flex flex-row justify-content-center align-items-center"
                  style={{gap: '10px'}}
                >
                  <img src={item.imageUrl} alt={item.name} />
                  <p
                    style={{
                      fontSize: '18px',
                      color: 'white',
                      fontWeight: '600',
                    }}
                  >
                    {item.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{fontSize: '20px', color: 'white', fontWeight: '600'}}>
              Life at Company
            </p>
            <div className="life-at-company-container">
              <p style={{fontSize: '18px', color: 'white', fontWeight: '400'}}>
                {lifeAtCompany.description}
              </p>
              <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="life-at-company"
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="mt-md-4 mb-md-3" style={{color: 'white'}}>
          Similar Jobs
        </h1>
        <ul
          className="d-flex flex-row justify-content-center flex-wrap similar-jobs-card-container"
          style={{listStyleType: 'none'}}
        >
          {similarJobs.map(item => (
            <li key={item.id} className="similar-jobs-card mt-2">
              <div className="d-flex flex-row" style={{gap: '15px'}}>
                <img
                  style={{height: '70px'}}
                  src={item.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="d-flex flex-column">
                  <h1 style={{fontSize: '24px', color: 'white'}}>
                    {item.title}
                  </h1>
                  <div className="d-flex flex-row mt-1">
                    <FaStar style={{color: '#fbbf24'}} />
                    <div>
                      <p style={{color: 'white', fontWeight: '600'}}>
                        {item.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="pr-4" style={{color: 'white', fontWeight: '700'}}>
                Description
              </p>
              <p className="pr-4" style={{color: 'white', fontWeight: '400'}}>
                {jobDescription}
              </p>
              <div className="d-flex flex-row justify-content-center gap-md">
                <div className="d-flex flex-row ">
                  <MdLocationOn style={{color: 'white', fontSize: '25px'}} />
                  <p style={{color: 'white', fontWeight: '600'}}>
                    {item.location}
                  </p>
                </div>
                <div className="d-flex flex-row ">
                  <RiSuitcaseFill style={{color: 'white', fontSize: '22px'}} />
                  <p
                    className="ml-1"
                    style={{color: 'white', fontWeight: '600'}}
                  >
                    {item.employmentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  loadingView = () => (
    <div
      className="loader-item-container  loader-container w-100 d-flex flex-row justify-content-center align-items-center"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 style={{color: 'white'}}>Oops! Something Went Wrong</h1>
      <p>We Cannot seem to find the page you are looking for.</p>
      <button
        onClick={this.getJobDetails}
        type="button"
        className="btn btn-primary"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.inprogress:
        return this.loadingView()

      case apiStatusConstants.failure:
        return this.failureView()

      default:
        return null
    }
  }
}

export default JobItemDetails
