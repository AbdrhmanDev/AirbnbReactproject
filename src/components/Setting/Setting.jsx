import React, { useEffect } from "react";
import {
  FaUser, FaLock, FaCreditCard, FaFileInvoiceDollar, FaBell,
  FaUserShield, FaGlobe, FaBriefcase, FaTools, FaUserFriends
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { fetchProfileThunk } from "../../services/Slice/Profile/ProfileAPI";

const UserInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile.profile) || {};
  const auth = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (auth) {
      dispatch(fetchProfileThunk());
    }
  }, []);

  const cardsData = [
    { key: "personal_info", icon: <FaUser size={25} />, path: '/account/personal-info' },
    { key: "login_security", icon: <FaLock size={25} />, path: '/account/login-security' },
    { key: "payments", icon: <FaCreditCard size={25} />, path: '/account/payments' },
    { key: "taxes", icon: <FaFileInvoiceDollar size={25} />, path: '/account/taxes' },
    { key: "notifications", icon: <FaBell size={25} />, path: '/account/notifications' },
    { key: "privacy", icon: <FaUserShield size={25} />, path: '/account/privacy' },
    { key: "global_preferences", icon: <FaGlobe size={25} />, path: '/account/global-preferences' },
    { key: "travel", icon: <FaBriefcase size={25} />, path: '/account/travel' },
    { key: "hosting_tools", icon: <FaTools size={25} />, path: '/account/hosting-tools' },
    { key: "referrals", icon: <FaUserFriends size={25} />, path: '/account/referrals' },
  ];

  return (
    <div className="container my-4">
      <div className="mx-auto p-3 rounded" style={{ maxWidth: "1000px" }}>
        <h5 className="mb-3">{t("account")}</h5>

        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-4">
          <p className="mb-2">{user?.name}, {user?.email}</p>
          <div>
            <Link to="Profile" className="text-dark fw-bold">
              {t("go_to_profile")}
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
                    <h5 className="card-title">{t(`card.${card.key}.title`)}</h5>
                    <p className="card-text text-muted">{t(`card.${card.key}.desc`)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

