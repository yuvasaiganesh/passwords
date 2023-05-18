import './index.css'

const Passwords = props => {
  const {details, deleteDetails, toShowPassword} = props
  const {username, password, id, website} = details

  const displayPassword = toShowPassword ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
      alt="stars"
      className="stars"
    />
  ) : (
    <p className="paragraph2">{password}</p>
  )

  const isDelete = () => {
    deleteDetails(id)
  }

  return (
    <li className="listSection">
      <p className="initialSection">{website[0]}</p>
      <div className="detailsSection">
        <p className="paragraph2">{website}</p>
        <p className="paragraph2">{username}</p>
        {displayPassword}
      </div>
      <button
        type="button"
        className="deleteButton"
        data-testid="delete"
        onClick={isDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="deleteIcon"
        />
      </button>
    </li>
  )
}

export default Passwords
