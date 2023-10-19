import {Link} from "react-router-dom"

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand" href="#">
            Users
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={'/'} className="nav-link" href="#">
                Add user
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/all' className="nav-link" href="#">
                All users
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
