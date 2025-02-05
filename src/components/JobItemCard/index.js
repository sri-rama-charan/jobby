import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiSuitcaseFill} from 'react-icons/ri'
import {Link} from 'react-router-dom'

const JobItemCard = props => {
  const {cardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = cardDetails

  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
      <li
        className="card-bg-container  mt-3 w-100 p-4"
        style={{cursor: 'pointer'}}
      >
        <div className="d-flex flex-row" style={{gap: '15px'}}>
          <img
            style={{height: '70px'}}
            src={companyLogoUrl}
            alt="company logo"
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
          <div className="d-flex flex-row gap-md">
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
          style={{height: '1px', color: '#7e858e', backgroundColor: '#7e858e'}}
        />
        <h1
          className="pr-4"
          style={{fontSize: '18px', color: 'white', fontWeight: '700'}}
        >
          Description
        </h1>
        <p className="pr-4" style={{color: 'white', fontWeight: '600'}}>
          {jobDescription}
        </p>
      </li>
    </Link>
  )
}

export default JobItemCard
