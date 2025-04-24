import React, { useEffect } from "react";
import {
  FaUser, FaLock, FaCreditCard, FaFileInvoiceDollar, FaBell,
  FaUserShield, FaGlobe, FaBriefcase, FaTools, FaUserFriends
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchProfileThunk } from "../../services/Slice/Profile/ProfileAPI";

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

  const dispatch = useDispatch();
  const {user}= useSelector((state)=>state.userProfile.profile)||{};
  
  useEffect(() => {
    dispatch(fetchProfileThunk())
  },[]);

  

  return (
   <>
    <div className="container my-4">
      <div className="mx-auto p-3 rounded" style={{ maxWidth: "1000px" }}>
        <h5 className="mb-3">Account</h5>

        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-4">
          <p className="mb-2">{user?.name}, {user?.email}</p>
          <div>
            <Link to="Profile" className="text-dark fw-bold">
              Go to profile
            </Link>
          </div>
        </div>

        <div className="row g-4">
          {cardsData.map((card, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <Link to={card.path} className="text-decoration-none">
                <div className="card shadow h-100" style={{ borderRadius: "10px" }}>
                  <div className="card-body d-flex flex-column align-items-start">
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
    </div>

   </>
  );
};

export default UserInfo;
