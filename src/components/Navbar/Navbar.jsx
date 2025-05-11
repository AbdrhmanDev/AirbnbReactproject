import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import Searchbar from '../Searchbar/Searchbar';
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiSwimmingPoolBold } from "react-icons/pi";
import { BsWater } from "react-icons/bs";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { FaSwimmer } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllFilterThunk } from '../../services/Slice/Filter/AllFillter';
import { fetchProfileThunk } from '../../services/Slice/Profile/ProfileAPI';
import ModalLogin from '../Login/ModalLogin';
import { logout } from '../../services/Slice/Login/GoogleLogin';
import { emitter } from '../../features/emitter';


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = localStorage.getItem('token');
    const [isLogin, setIsLogin] = useState(!!login);
    const auth= useSelector((state)=>state.auth.token)
    const userProfile= useSelector((state)=>state.userProfile.profile)
    
    useEffect(() => {
        dispatch(fetchProfileThunk())
    },[])

    const handelLogout = () => {
        dispatch(logout());
        setIsLogin(false);
        localStorage.removeItem('token');
        navigate('/');
    };

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
                        <span className="fw-semibold">
                            <button className='border-0 bg-body p-2 hoverFromNav'>{
                                isLogin || auth ? "Switch to hosting" : "Airbnb your home"
                            }</button>
                        </span>

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
                           {
                            isLogin || auth &&
                            userProfile?.user?.avatar ? 
                            <img src={userProfile?.user?.avatar} className='rounded-circle' alt="" style={{ width: '30px', height: '30px' }}/>
                            : <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                            {/* img profile */}
                        </div>
                           }
                            <span className="position-absolute top-0 start-100 me-5 mt-1 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                                2
                            </span>

                            {showMenu && (
                                <div
                                    className="position-absolute bg-white border rounded shadow p-2"
                                    style={{ top: '120%', right: 0, zIndex: 1000, minWidth: '180px' }}>
                                    {/* ul Login */}
                                    {isLogin || auth  ?
                                        <ul className="list-unstyled mb-0 m-2">
                                            <li><Link to="/profile" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Messages</Link></li>
                                            <li><Link to="/trips" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Trips</Link></li>
                                            <li><Link to="/wishlist" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Wishlist</Link></li>
                                            <div className='border'></div>
                                            <li><Link to="/profile" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Manage listings</Link></li>
                                            <li><Link to="/bookings" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Host an experience</Link></li>
                                            <li><Link to="/bookings" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Refer a Host</Link></li>
                                            <li><Link to="/Account" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Account</Link></li>
                                            <div className='border'></div>
                                            <li><Link to="/settings" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Gift cards</Link></li>
                                            <li><Link to="/help" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Help Center</Link></li>
                                            <li><Link className="dropdown-item m-2" onClick={handelLogout} style={{ fontSize: "13px" }}>Logout</Link></li>
                                        </ul>
                                        :
                                        !isLogin && <ul className="list-unstyled mb-0 m-2">
                                            <li>
                                                <p
                                                    className="dropdown-item m-2"
                                                    style={{ fontSize: "13px", cursor: "pointer" }}
                                                    onClick={
                                                        () => {
                                                            emitter.emit('open-modal')
                                                        }}
                                                >
                                                    login
                                                </p>
                                            </li>
                                            <li><Link to="/profile" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Sign Up</Link></li>
                                            <div className='border'></div>
                                            <li><Link to="/profile" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Gift cards</Link></li>
                                            <li><Link to="/profile" className="dropdown-item m-2 " style={{ fontSize: "13px" }}>Airbnb Your Home</Link></li>
                                            <li><Link to="/bookings" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Host an experience</Link></li>
                                            <li><Link to="/help" className="dropdown-item m-2" style={{ fontSize: "13px" }}>Help Center</Link></li>
                                        </ul>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {!isScrolled && (
                <SearchBar className="w-50" />
            )}
            <ModalLogin/>
        </>
    );
};
const SearchBar = () => {
    const [showGuestMenu, setShowGuestMenu] = useState(false);
    const [showAddress, setShowAddressMenu] = useState(false);
    const [selectWhare, setselectWhare] = useState();
    const guestRef = useRef();
    const addressRef = useRef();
    const dispatch = useDispatch()
    const [AddressValue, setAddressValue] = useState('')
    const navigate = useNavigate()
    const [StartDate, setStartDate] = useState();
    const [EndDate, setEndDate] = useState();
    const [adults, setAdults] = useState(null);
    const [children, setChildren] = useState(null);
    const [infants, setInfants] = useState(null);
    const [pets, setPets] = useState(null);

    const destinations = [
        { name: 'Hurghada, Egypt', reason: 'Because your wishlist has stays in Tenerife', icon: <PiSwimmingPoolBold /> },
        { name: 'Aspen, USA', reason: 'For sights like Plaza de España', icon: <BsWater color='#81AFF1' /> },
        { name: 'London, United Kingdom', reason: 'Guests interested in Amsterdam also looked here', icon: <PiBuildingApartmentFill /> },
        { name: 'Miami, USA', reason: 'For its bustling nightlife', icon: <FaSwimmer color='#81AFF1' /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (guestRef.current && !guestRef.current.contains(event.target)) {
                setShowGuestMenu(false);
            }
            if (addressRef.current && !addressRef.current.contains(event.target)) {
                setShowAddressMenu(false);
            }

        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {

    }, [selectWhare]);

    const getSelect = (selected) => {
        setselectWhare(selected);
        setAddressValue(selected);
        setShowAddressMenu(false);
    };

    const handleSearch = () => {
        const valuestart = StartDate ? StartDate.toLocaleDateString('en-GB') : "";
        const valueend = EndDate ? EndDate.toLocaleDateString('en-GB') : "";

        const allFilters = {
            city: AddressValue.trim(),
            startDate: valuestart,
            endDate: valueend,
            capacity: {
                adults: adults,
                children: children,
                infants: infants
            },
            pets: pets
        };

        if (!AddressValue || AddressValue.trim().length === 0) {
            toast.error('Please enter a valid address', {
                hideProgressBar: true,
                className: "toastfay",
                closeButton: false
            });
            return;
        }
        dispatch(GetAllFilterThunk(allFilters));
        navigate('/Filter');
    };

    const renderCounter = (label, subLabel, count, setCount) => (
        <div className="mb-4 d-flex justify-content-between align-items-center">
            <div>
                <div>{label}</div>
                <div className="text-muted" style={{ fontSize: '9px' }}>{subLabel}</div>
            </div>
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-light border rounded-circle px-2 py-0 m-1"
                    onClick={() => setCount(Math.max(count - 1, 0))}
                    disabled={count === 0}
                >
                    −
                </button>
                <span className="mx-3">{count == null ? 0 : count}</span>
                <button
                    className="btn btn-light border rounded-circle px-2 py-0"
                    onClick={() => setCount(count + 1)}
                >
                    +
                </button>
            </div>
        </div>
    );

    return (
        <div className="d-flex shadow-sm pb-2 align-items-center justify-content-center  hmada">
            <div className="bg-white d-flex align-items-center search-bar position-relative hamad">
                <div className="search-section">
                    <div className="search-label">Where</div>
                    <input type="text"
                        value={AddressValue}
                        onClick={() => {
                            setShowAddressMenu(true);
                            setShowGuestMenu(false);
                        }}
                        onChange={(e) => setAddressValue(e.target.value)}
                        className="border-0 search-input search-label " placeholder="Search destinations" />
                </div>

                {showAddress && (
                    <>
                        <div
                            ref={addressRef}
                            className="position-absolute bg-white border rounded shadow-sm p-3"
                            style={{
                                top: '120%',
                                left: 0,
                                zIndex: 1000,
                                width: '300px',
                            }}
                        >
                            <label className='m-2' style={{ fontSize: '10px' }} >Recent searches</label>
                            {destinations.map((destination, index) => {
                                return (
                                    <div key={index} className="mb-2" >
                                        <button className="fw-bold text-start border-0 selectElement"
                                            onMouseDown={() => getSelect(destination.name)}
                                            value={destination.name}>
                                            <span className='fs-4 m-2'> {destination.icon}</span>
                                            {destination.name}
                                            <div className="text-muted ms-5" style={{ fontSize: '10px' }}>
                                                {destination.reason}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                <div className="search-section">
                    <div className="search-label">Check in</div>
                    {/* <input type="calender" className="border-0 search-input search-label" placeholder="Add dates" /> */}
                    <DatePicker
                        selected={StartDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MMMM d"
                        dropdownMode="select"
                        className='border-0 calenderNew'
                        placeholderText="Add Dates"
                    />
                </div>

                <div className="search-section">
                    <div className="search-label">Check out</div>
                    {/* <input type="text" className="border-0 search-input search-label" placeholder="Add dates" /> */}
                    <DatePicker
                        selected={EndDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="MMMM d"
                        dropdownMode="select"
                        className='border-0 calenderNew'
                        placeholderText="Add Dates"
                    />
                </div>

                <div className="search-section2 me-2 position-relative" onClick={() => {
                    setShowGuestMenu(true);
                    setShowAddressMenu(false);
                }} ref={guestRef}>
                    <div className="search-label" style={{ cursor: 'pointer' }}>
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
                                {renderCounter("Adults", "Ages 13 or above", adults, setAdults)}
                                {renderCounter("Children", "Ages 2 – 12", children, setChildren)}
                                {renderCounter("Infants", "Under 2", infants, setInfants)}
                                {renderCounter("Pets", "Bringing a service animal?", pets, setPets)}
                            </div>
                        </>
                    )}
                </div>

                <button className="search-button" onClick={handleSearch}>
                    <IoSearch />
                </button>
            </div>
        </div>
    );
};



export default Navbar;
