const renderNotFound = () => (
  <div
    style={{height: '100vh'}}
    className="bg-dark w-100 d-flex flex-column justify-content-center align-items-center"
  >
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 style={{color: 'white'}}>Page Not Found</h1>
    <p style={{color: 'white'}}>
      we're sorry, the page you requested could not be found
    </p>
  </div>
)

export default renderNotFound
