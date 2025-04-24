import React, { useEffect, useRef, useState } from 'react';
import {
    FaCamera,
    FaBriefcase,
    FaGlobe,
    FaSchool,
    FaPaw,
    FaMusic,
    FaMagic,
    FaClock
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProfileSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileThunk } from '../../services/Slice/Profile/ProfileAPI';
const profileFields = [
    { icon: <FaSchool className="me-3" />, text: 'Where I went to school' },
    { icon: <FaGlobe className="me-3" />, text: "Where I've always wanted to go" },
    { icon: <FaBriefcase className="me-3" />, text: 'My work' },
    { icon: <FaPaw className="me-3" />, text: 'Pets' },
    { icon: <FaMusic className="me-3" />, text: 'My favorite song in high school' },
    { icon: <FaClock className="me-3" />, text: 'I spend too much time: ', value: 'dsasa' },
    { icon: <FaMagic className="me-3" />, text: 'My most useless skill' }
];
const interests = [
    { icon: "☕", label: "Coffee" },
    { icon: "🍜", label: "Food" },
    { icon: "🎵", label: "Live music" },
    { icon: "🔭", label: "Local culture" },
    { icon: "🏛️", label: "Museums" },
    { icon: "📸", label: "Photography" },
    { icon: "🏊‍♂️", label: "Swimming" },
];

const ProfileSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [ShowModal, setShowModal] = useState(false)
    const [valueWatched, setValueWatched] = useState(" ")
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedProfileFields, setSelectedProfileFields] = useState([])
    const maxChars = 500;
    const modalRef = useRef();
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const {user}= useSelector((state)=>state.userProfile.profile)||{};
    
    useEffect(() => {
      dispatch(fetchProfileThunk())
    },[]);
    const handleOpen = () => setShowModal(true);
    const handleChange = (e) => setValueWatched(e.target.value);

    const savaData = () => {
        setShowModal(false)
    }
    const toggleInterest = (label, icon) => {
        setSelectedInterests((prev) => {
            const exists = prev.find((item) => item.label === label);
            if (exists) {
                return prev.filter((item) => item.label !== label);
            } else {
                return [...prev, { label, icon }];
            }
        });
        console.log(label, icon);
    };
    const toggleProfileFields = (label, icon) => {
        setSelectedProfileFields((prev) => {
            const exists = prev.find((item) => item.label === label);
            if (exists) {
                return prev.filter((item) => item.label !== label);
            } else {
                return [...prev, { label, icon }];
            }
        });
        // console.log(label,icon);
    };
    const finishData = () => {
        const profileData = {
            interests: selectedInterests,
            profileFields: selectedProfileFields,
            about: valueWatched
        };

        localStorage.setItem("profileData", JSON.stringify(profileData));
        alert("save changed your Favorite")
        navigate(-1);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        if (ShowModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ShowModal]);
    return (
        <div className="w-100 px-3 py-5 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: '1100px' }}>
                <div className="row d-flex align-items-start">

                    {/* Profile Picture */}
                    <div className="col-12 col-md-4 text-center mb-4">
                        <div className="position-relative d-inline-block">
                            <div
                                className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center mx-auto"
                                style={{ width: '150px', height: '150px', fontSize: '72px' }}
                            >
                                {
                                    user?.avatar == null ? user.name.slice(0,1):
                               <img width={"100%"} style={{borderRadius:"50%"}} src={user.avatar} alt="" />
                                    
                                }
                            </div>
                            <button
                                className="btn btn-light  position-absolute bottom-0 start-50 translate-middle-x rounded-pill px-3 py-1 shadow-sm d-flex align-items-center"
                                style={{ fontSize: '14px' }}
                            >
                                <FaCamera className="me-2" /> Add
                            </button>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="col-12 col-md-8 ">
                        <h3>Your profile</h3>
                        <p className="text-muted">
                            The information you share will be used across Airbnb to help other guests and Hosts get to know you.{' '}
                            <Link>Learn more</Link>
                        </p>

                        <div className={`${styles.hover_item}  row mt-4`}>
                            {profileFields.map((field, index) => {
                                const isSelectedProfile = selectedProfileFields.some((i) => i.label === field.text);

                                return (
                                    <div key={index}
                                        onClick={() => toggleProfileFields(field.text, field.icon)}
                                        style={{
                                            color: isSelectedProfile ? "#fff" : "#000",
                                            backgroundColor: isSelectedProfile ? "#000" : "#fff",
                                            cursor: "pointer",
                                            borderRadius: "40px",
                                            padding: "10px",
                                            transition: "0.3s"
                                        }}
                                        className={`col-10 col-md-6 mb-4 d-flex align-items-center pb-3`}>
                                        {field.icon}
                                        <span>
                                            {field.text}
                                            {field.value && <strong className=" ms-1">{field.value}</strong>}
                                        </span>
                                    </div>
                                );
                            })}

                        </div>

                        <div className='col-lg-12  col-md-8 col-sm-12 border-bottom pb-3'>
                            <h3>About you</h3>
                            <div className={`${styles.text_aria} p-3`}>
                                <p className='m-0 p-o text-muted'>

                                    {
                                        valueWatched.length > 1 ? valueWatched : "Write something fun and punchy."
                                    }
                                </p>
                                <Link onClick={handleOpen}>Add intro</Link>
                            </div>
                        </div>

                        <h3 className="mt-4 ">What you’re into</h3>
                        <div className="container ">
                            <div className="d-flex flex-wrap gap-2 border-bottom pb-3">
                                {interests.map((item, index) => {
                                    const isSelected = selectedInterests.some((i) => i.label === item.label);
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => toggleInterest(item.label, item.icon)}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            className="d-flex align-items-center border px-4 py-2"
                                            style={{
                                                borderRadius: "2rem",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                                backgroundColor: isSelected ? "#3e3e3e" : hoveredIndex === index ? "#f7f7f7" : "transparent",
                                                color: isSelected ? "#fff" : "#000",

                                            }}
                                        >
                                            <span className="me-2" style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                                            <span>{item.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='text-end'>
                            <button onClick={finishData}
                                className='border-0 p-2 ps-4 pe-4 mt-3 mb-5 rounded-2 bg-dark text-light'
                            >Done</button>
                        </div>

                    </div>

                    {
                        ShowModal &&
                        (
                            ShowModal && (
                                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
                                    <div ref={modalRef} className="position-relative bg-white p-4 rounded-5" style={{ maxWidth: '500px', width: '100%' }}>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="position-absolute top-0 end-0 m-3 btn-close"
                                            aria-label="Close"
                                        >
                                        </button>
                                        <h2 className="fs-5 mb-3 ">Write a short intro</h2>
                                        <p className='text-muted w-75' style={{ fontSize: "13px" }}>Tell us a little bit about yourself, so your future hosts or guests can get to know you</p>
                                        <textarea maxLength={maxChars} onChange={handleChange} value={valueWatched} rows="4" className="form-control mb-3 rounded-3" placeholder="Tell people a little about yourself..."></textarea>
                                        <p className='text-muted text-end me-3'
                                            style={{ fontSize: "13px" }}>{maxChars - valueWatched.length} </p>
                                        <div className="text-end">
                                            <button onClick={savaData} className="btn btn-dark">Save</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
