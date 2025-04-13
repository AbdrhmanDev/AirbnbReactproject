import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } 
      else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2 ">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" alt="Airbnb" height="30" />
        </a>
        {!isScrolled ? (
          <>
        <div className='d-flex'>
            
        <ul className="navbar-nav col-12 mx-auto mb-2 mb-lg-0 gap-4">
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">Homes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-muted" href="#">Experiences</a>
            </li>
          </ul>
        </div>
          </>
        ) : (
          <SearchBar />
        )}
     

        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold">Switch to hosting</span>

          <a href="#" className="text-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm8-7a7 7 0 0 1 6.468 4.421C13.5 5.226 12.03 5 10.5 5c-1.45 0-2.798.214-3.963.573A6.97 6.97 0 0 1 1.51 8c0 1.042.248 2.027.686 2.909C3.266 10.176 5.771 9 8.5 9c1.707 0 3.31.475 4.66 1.25A6.971 6.971 0 0 1 8 15a7 7 0 0 1 0-14z" />
            </svg>
          </a>

          <div className="bg-white border rounded-pill px-3 py-1 d-flex align-items-center position-relative" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list me-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12.5A.5.5.5 0 0 1 3 12h10a.5.5.5 0 0 1 0 1H3a.5.5.5 0 0 1-.5-.5zm0-4A.5.5.5 0 0 1 3 8h10a.5.5.5 0 0 1 0 1H3a.5.5.5 0 0 1-.5-.5zm0-4A.5.5.5 0 0 1 3 4h10a.5.5.5 0 0 1 0 1H3a.5.5.5 0 0 1-.5-.5z" />
            </svg>

            <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
              A
            </div>

            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
              2
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SearchBar = () => (
  <div className="d-flex align-items-center justify-content-center mt-3">
    <div className="bg-white d-flex align-items-center search-bar">
      <div className="search-section">
        <div className="search-label">Where</div>
        <input type="text" className="border-0 fs-6" placeholder="Search destinations" />
      </div>

      <div className="search-section">
        <div className="search-label">Check in</div>
        <div className="search-input">Add dates</div>
      </div>

      <div className="search-section">
        <div className="search-label">Check out</div>
        <div className="search-input">Add dates</div>
      </div>

      <div className="search-section me-2">
        <div className="search-label">Who</div>
        <div className="search-input">Add guests</div>
      </div>

      <button className="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11 6a5 5 0 1 0-1.001 9.9A5 5 0 0 0 11 6zm-9 5a7 7 0 1 1 12.9 4.4l3.387 3.387a1 1 0 0 1-1.414 1.414l-3.387-3.387A7 7 0 0 1 2 11z" />
        </svg>
      </button>
    </div>
  </div>
);

export default Navbar;
