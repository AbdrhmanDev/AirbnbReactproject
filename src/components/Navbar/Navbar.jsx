import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import Searchbar from '../Searchbar/Searchbar';
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container d-flex justify-content-between align-items-center ">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" alt="Airbnb" height="30" />
                    </a>

                    <div>
                        {!isScrolled ? (
                            <ul className="navbar-nav col-12 justify-content-center mx-auto">
                                <li className="nav-item">
                                    <a className="nav-link fw-bold" href="#">Homes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-muted" href="#">Experiences</a>
                                </li>
                            </ul>
                        ) : (
                            <Searchbar />
                        )}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold">Switch to hosting</span>

                        <a href="#" className="text-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm8-7a7 7 0 0 1 6.468 4.421C13.5 5.226 12.03 5 10.5 5c-1.45 0-2.798.214-3.963.573A6.97 6.97 0 0 1 1.51 8c0 1.042.248 2.027.686 2.909C3.266 10.176 5.771 9 8.5 9c1.707 0 3.31.475 4.66 1.25A6.971 6.971 0 0 1 8 15a7 7 0 0 1 0-14z" />
                            </svg>
                        </a>

                        <div
                            className="bg-white border rounded-pill px-2 py-1 d-flex align-items-center position-relative"
                            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                            onClick={() => setShowMenu(!showMenu)}
                            ref={menuRef}
                        >
                            <RxHamburgerMenu className='me-2' />
                            <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                A
                            </div>
                            <span className="position-absolute top-0 start-100 me-5 mt-1 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                                2
                            </span>

                            {showMenu && (
                                <div
                                    className="position-absolute bg-white border rounded shadow p-2"
                                    style={{
                                        top: '120%',
                                        right: 0,
                                        zIndex: 1000,
                                        minWidth: '180px'
                                    }}
                                >
                                    <ul className="list-unstyled mb-0 m-2">
                                        <li><Link to="/profile" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Profile</Link></li>
                                        <li><Link to="/wishlist" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Wishlist</Link></li>
                                        <li><Link to="/bookings" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Bookings</Link></li>
                                        <div className='border'></div>
                                        <li><Link to="/settings" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Settings</Link></li>
                                        <li><Link to="/help" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Help</Link></li>
                                        <li><Link to="/logout" className="dropdown-item  m-2" style={{ fontSize: "13px" }}>Logout</Link></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {!isScrolled && (
                <SearchBar className="w-50" />
            )}
        </>
    );
};
const SearchBar = () => {
    const [showGuestMenu, setShowGuestMenu] = useState(false);
    const guestRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (guestRef.current && !guestRef.current.contains(event.target)) {
                setShowGuestMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="d-flex shadow-sm pb-2 align-items-center justify-content-center mt-1 hmada">
            <div className="bg-white d-flex align-items-center search-bar position-relative hamad">
                <div className="search-section">
                    <div className="search-label">Where</div>
                    <input type="text" className="border-0 search-input search-label" placeholder="Search destinations" />
                </div>

                <div className="search-section">
                    <div className="search-label">Check in</div>
                    <input type="text" className="border-0 search-input search-label" placeholder="Add dates" />
                </div>

                <div className="search-section">
                    <div className="search-label">Check out</div>
                    <input type="text" className="border-0 search-input search-label" placeholder="Add dates" />
                </div>

                <div className="search-section2 me-2 position-relative" onClick={() => setShowGuestMenu(!showGuestMenu)} ref={guestRef}>
                    <div className="search-label"  style={{ cursor: 'pointer' }}>
                        Who
                    </div>
                    <div className="search-label">Add guests</div>

                    {showGuestMenu && (
                        <>
                        <div
                            className="position-absolute bg-white border rounded shadow-sm p-3"
                            style={{
                                top: '150%',
                                right: 0,
                                zIndex: 1000,
                                width: '300px',
                            }}
                        >
                            <div className="mb-3">
                                <div className="" >Adults</div>
                                <div className="text-muted" style={{ fontSize: '9px' }}>Ages 13 or above</div>
                            </div>

                            <div className="mb-3">
                                <div className="">Children</div>
                                <div className="text-muted" style={{ fontSize: '9px' }}>Ages 2 – 12</div>
                            </div>

                            <div className="mb-3">
                                <div className="">Infants</div>
                                <div className="text-muted" style={{ fontSize: '9px' }}>Under 2</div>
                            </div>

                            <div>
                                <div className="">Pets</div>
                                <div className="text-muted" style={{ fontSize: '12px' }}>Bringing a service animal?</div>

                            </div>
                        </div>
                        </>
                    )}
                </div>

                <button className="search-button">
                    <IoSearch />
                </button>
            </div>
        </div>
    );
};



export default Navbar;
