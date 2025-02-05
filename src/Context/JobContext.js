import React from 'react'

const JobContext = React.createContext({
  apiStatus: '',
  jobsList: [],
  getJobItems: () => {},
})

export default JobContext
