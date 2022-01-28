import React,{useEffect} from 'react'
import {Link , useLocation} from 'react-router-dom'

export default function Navbar() {
    let location = useLocation();
    useEffect(() => {
      console.log(location.pathname);
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='container-fluid'>
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname === "/" ? "active":""}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active":""}`} to="/about">About</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0  d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            </div>
        </nav>
    )
}
