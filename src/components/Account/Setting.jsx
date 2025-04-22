import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaCreditCard, FaFileInvoiceDollar, FaBell, FaUserShield, FaGlobe, FaBriefcase, FaTools, FaUserFriends } from 'react-icons/fa';
import { Link } from "react-router-dom";
const cardsData = [
    { title: 'Personal info', icon: <FaUser size={25} />, description: "Manage your name, email and phone.", path: '/account/personal-info' },
    { title: 'Login & security', icon: <FaLock size={25} />, description: "Update your password and secure your account.", path: '/account/login-security' },
    { title: 'Payments & payouts', icon: <FaCreditCard size={25} />, description: "Set up payment methods and view payouts.", path: '/account/payments' },
    { title: 'Taxes', icon: <FaFileInvoiceDollar size={25} />, description: "Manage your tax information and invoices.", path: '/account/taxes' },
    { title: 'Notifications', icon: <FaBell size={25} />, description: "Choose how you want to stay updated.", path: '/account/notifications' },
    { title: 'Privacy and sharing', icon: <FaUserShield size={25} />, description: "Control what you share and with whom.", path: '/account/privacy' },
    { title: 'Global preferences', icon: <FaGlobe size={25} />, description: "Set your language, currency, and more.", path: '/account/global-preferences' },
    { title: 'Travel for work', icon: <FaBriefcase size={25} />, description: "Organize business travel easily.", path: '/account/travel' },
    { title: 'Professional hosting tools', icon: <FaTools size={25} />, description: "Enhance your hosting experience.", path: '/account/hosting-tools' },
    { title: 'Guest referrals', icon: <FaUserFriends size={25} />, description: "Invite friends and earn rewards.", path: '/account/referrals' },
  ];
const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  // استرجاع بيانات اليوزر من localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" container text-start style-card" style={{ marginTop:"100px" }}>
      <h1>Account</h1>
      <div className="Account d-flex font-weight-bold font-size=" style={{ fontSize: "20px" }}>
        <p>{userData.name},{userData.email} ,</p>
        <Link to="/Profile" style={{ color: 'black',fontWeight: 'bold'  }} >
       <p>Go to profile</p>
      </Link> 
      </div>
      <div className="row g-4">
        {cardsData.map((card, index) => (
          <div className="col-12 col-sm-6 col-md-4" key={index}>
        <Link to={card.path} className="text-decoration-none">
            <div className="card text-center shadow  style-card" style={{ borderRadius: "10px", height: "170px" }}>
              <div className="card-body d-flex flex-column align-items-start justify-content-start">
                <div className="mb-3">{card.icon}</div>
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text text-muted">{card.description}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
